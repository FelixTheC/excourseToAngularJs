angular.module("tutorialCtrlModule", [])

.controller("TutorialCtrl", ["$scope", "Calculations", function($scope, Calculations){
	
	$scope.tutorialObject = {};
	$scope.tutorialObject.title = "Main Page";
	$scope.tutorialObject.subtitle = "Subtitle";
	$scope.tutorialObject.firstname = "Felix";
	$scope.tutorialObject.lastname = "Eisenmenger";

	$scope.tutorialObject.bindOutput = 2;

	/*
	$scope.timesTwo = function(){
		$scope.tutorialObject.bindOutput *= 2
	}
	
	$scope.reset = function(){
		$scope.tutorialObject.bindOutput = 2
	}

	*/

	$scope.timesTwo = function(){
		$scope.tutorialObject.bindOutput = Calculations.timesTwo($scope.tutorialObject.bindOutput);
	}

	$scope.reset = function(){
		$scope.tutorialObject.bindOutput = Calculations.reset($scope.tutorialObject.bindOutput);
	}
	
}])

.directive("welcomeMessage", function(){
	return{
		restrict: "E", //E->Element, A->Attribut, C->Class it is possible to combine them
		template: "<div>How are you?</div>"
	}
})

.factory("Calculations", function(){
	var calculations = {};
	calculations.timesTwo =function(a){
			return a * 2;
	};

	calculations.reset = function(a){
		return a = 2
	};

	return calculations;
});

.controller("TutorialCtrl2", ["$scope", function($scope){
	
	$scope.secondTutorial = "Welcome to the second Page";
	
}]);
