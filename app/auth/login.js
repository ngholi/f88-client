(function(){

'use strict';

var Login = angular.module('Login', ['Auth', 'ui.router']);

Login.controller('LoginCtrl', ['$scope', 'Authenticate', '$state', function($scope, auth, $state){
	$scope.login = function(){
		console.log($scope.user);
		auth.login($scope.user).then(function(res){
			//Login successfully
			console.log(res);
			auth.saveToken(res.data.token);
			$state.go('main.dashboard');
		}, function(res){
			//Login false
			console.log(res);
		});
	}
}]);

})();

