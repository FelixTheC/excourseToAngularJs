var app = angular.module("groceryListApp", ["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "index.html",
			controller: "HomeController"
		})
		.when("/addItem", {
			templateUrl: "addItem.html",
			controller: "GroceryListItemsController"
		})
		.when("/addItem/:id", {
			templateUrl: "addItem.html",
			controller: "GroceryListItemsController"
		})
		.when("/addItem/edit/:id", {
			templateUrl: "addItem.html",
			controller: "GroceryListItemsController"
		})
		/*.otherwise({
			redirectTo: "/"
		})*/
});

app.service("GroceryService", function(){
	var groceryService = {};

	groceryService.groceryItems = [
		{id: 1, completed: false, itemName: 'milk', date: '2017-06-20'},
		{id: 2, completed: false, itemName: 'cheese', date: '2017-06-20'},
		{id: 3, completed: false, itemName: 'wurst', date: '2017-06-20'},
		{id: 4, completed: false, itemName: 'water', date: '2017-06-20'},
		{id: 5, completed: false, itemName: 'butter', date: '2017-06-20'},
		{id: 6, completed: false, itemName: 'tea', date: '2017-06-20'},
		{id: 7, completed: false, itemName: 'meat', date: '2017-06-20'},
		{id: 8, completed: false, itemName: 'eggs', date: '2017-06-20'},
		{id: 9, completed: false, itemName: 'bread', date: '2017-06-20'},

	];

	groceryService.findById = function(id){
		for(var item in groceryService.groceryItems){
			if(groceryService.groceryItems[item].id === id)
				return groceryService.groceryItems[item]
		}
	}

	groceryService.getNewId = function(){
		if(groceryService.newId){
			groceryService.newId++;
			return groceryService.newId;
		}else{
			//underscore.js -> www.underscorejs.org
			var maxId = _.max(groceryService.groceryItems, function(entry){
				return entry.id;
			})
			groceryService.newId = maxId.id + 1;
			return groceryService.newId;
		}
	}

	groceryService.markCompleted = function(entry){
		entry.completed = !entry.completed;
	}

	groceryService.removeItem = function(entry){
		var index = groceryService.groceryItems.indexOf(entry);

		groceryService.groceryItems.splice(index, 1);
	};

	groceryService.save = function(entry){
		var updatedItem = groceryService.findById(entry.id);

		if(updatedItem) {
			updatedItem.completed = entry.completed;
			updatedItem.itemName = entry.itemName;
			updatedItem.date = entry.date;
		}else {
			entry.id = groceryService.getNewId();
			groceryService.groceryItems.push(entry);	
		}
	};

	return groceryService; 

});

app.controller("HomeController", ["$scope", "GroceryService", function($scope, GroceryService){
	$scope.appTitle = "Grocery List"

	$scope.groceryItems = GroceryService.groceryItems;
	
	$scope.removeItem = function(entry){
		GroceryService.removeItem(entry);
	}

	$scope.markCompleted = function(entry){
		GroceryService.markCompleted(entry);
	};

}]);

app.controller("GroceryListItemsController", ["$scope", "$routeParams", "$location", function($scope, $routeParams, $location){
	
	if(!$routeParams.id){
		$scope.groceryItem = {id: 0, completed: false, itemName: "", date: new Date()}
	}else {
		$scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
	}

	$scope.save = function(){
		GroceryService.save($scope.groceryItem);
		$location.path("/");
	}
}]);