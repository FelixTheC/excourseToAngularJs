
var app = angular.module("tutorialApp", ["tutorialCtrlModule"]);

app.config(["$routeProvider",
	function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "views/tutorial_1.html",
			controller: "TutorialCtrl"
		})
		.when("/secondePage", {
			templateUrl: "views/site2.html",
			controller: "TutorialCtrl2"
		})
		.otherwise({
			redirectTo: "/"
		});
}]);