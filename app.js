var express = require('express');
var app = express();
var mongodb = require('mongodb');
var bodyparser = require('body-parser');
var db;
// conexión a la base de datos
mongodb.MongoClient.connect("mongodb://localhost:27017/pizzeria", function(err, database){
	if(err){
		console.log(err);
		process.exit(1);
	}

	// save database object from the callback for reuse
	db = database;
	console.log("Database connection ready");
});

app.use(express.static(__dirname + '/public'));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/api/pizzas', function(req, res){
	db.collection("pizzas").find({}).toArray(function(err, docs){
		if(err){
			handleError(res, err.message, "Failed to get contacts.");
		} else {
			res.status(200).json(docs);
		}
	});
});

app.post('/api/pizzas', function(req, res) {
	db.collection("pizzas").insert({
		_id: req.body.id,
		nombre: req.body.nombre,
		origen: req.body.origen,
		ingredientes:[
			req.body.ing1,
			req.body.ing2,
			req.body.ing3
		]
	}, function(err){
		if(err){
			handleError(res, err.message, "Failed to get contacts");
		} else {
			res.status(200).json("{mensaje:insertado}");
		}
	});
});

app.delete('/api/pizzas/:id', function(req, res) {
	db.collection("pizzas").remove({
		_id: req.params.id
	}, function(err){
		if(err){
			handleError(res, err.message, "Failed to get contacts");
		} else {
			res.status(200).json("{mensaje:eliminado exitósamente}");
		}
	});
});

app.put('/api/pizzas', function(req, res){
	db.collection("pizzas").update({
		_id: req.body.id},
		{ $set: {
			origen: req.body.origen,
			_id: req.body.id
		}
		}, function(err){
			if(err){
				handleError(res, err.message, "Failed t update element");
		} else {
				res.status(200).json("{mensaje: actualizado correctamente");
		}
	});
});

app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});

app.listen(8080, function(){
	console.log('MEAN corriendo on port 8080');
});