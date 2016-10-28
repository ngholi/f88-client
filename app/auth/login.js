(function(){

'use strict';

var Login = angular.module('Login', ['Auth', 'ui.router', 'ApplicationConfig']);

Login.controller('LoginCtrl', ['$scope', 'Authenticate', '$state', 'toastr', 'AppConfig', function($scope, auth, $state, toastr, AppConfig){
	$scope.login = function(){
		if(!$scope.isLogging){
			$scope.isLogging = true;
			auth.login($scope.user).then(function(res){
				//Login successfully
				auth.saveToken(res.data.token);
				$state.go('main.dashboard');
			}, function(res){
				//Login false
				if(res.status == 400)
					toastr.error(AppConfig.msg.INVALID_EMAIL_OR_PASSWORD, AppConfig.msg.LOGIN_FAIL);
				$scope.isLogging = false;
			});
		}
	}
}]);

})();

