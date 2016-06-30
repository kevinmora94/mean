angular.module('ngpizzeria', []);
function mainController($scope, $http){
	$scope.formData = {};
	
	$http.get('/api/pizzas').success(function(data){
		$scope.pizzas = data;
		console.log(data);
	}).error(function(){
		console.log('Error: '+ data);
	});

	$scope.createPizza = function(){
		$http.post('/api/pizzas', $scope.formData).success(function(data){
			$scope.formData = {};
			console.log(data);

			$.notify({
			// options
			message: 'Se ha agregado una pizza' 
			},{
				// settings
				type: 'success'
			});

		}).error(function(data){
			console.log('Error: ' + data);
		});
		$http.get('/api/pizzas').success(function(data){
			$scope.pizzas = data;
			console.log(data);
		}).error(function(data){
			console.log('Error: '+ data);
		});
	};

	$scope.updatePizza = function(){
		$http.put('/api/pizzas', $scope.updateData).success(function(data){
			$scope.updateData = {};
			console.log(data);

			$.notify({
			// options
			message: 'Se ha modificado el origen de la pizza' 
			},{
				// settings
				type: 'success'
			});

		}).error(function(data){
			console.log('Error modificando: ' + data);
		});
		$http.get('/api/pizzas').success(function(data){
			$scope.pizzas = data;
			console.log(data);
		}).error(function(data){
			console.log('Error: '+ data);
		});
	};

	$scope.deletePizza = function(id){
		$http.delete('/api/pizzas/' + id).success(function(data){
			$scope.todos = data;
			console.log(data);

			$.notify({
			// options
			message: 'Se ha eliminado la pizza' 
			},{
				// settings
				type: 'danger'
			});

		}).error(function(data){
			console.log('Error: '+ data);
		});
		$http.get('/api/pizzas').success(function(data){
			$scope.pizzas = data;
			console.log(data);
		}).error(function(data){
			console.log('Error: '+ data);
		});
	};
};