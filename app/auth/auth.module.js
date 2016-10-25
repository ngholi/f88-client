(function(){

'use strict';
var Auth = angular.module('Auth', ['ui.router', 'ApplicationConfig']);

Auth.factory('Authenticate', ['$http','AppConfig', '$window', function($http, AppConfig, $window){
	return {
		login: function(user){
			return $http.post(AppConfig.api.loginUrl, user);
		},
		isAuthenticated: function(){
			var token = $window.localStorage.token;
			if(token && token.split('.').length === 3){
				//Token exists and valid
				return true;
			}
			return false;
		},
		saveToken: function(token){
			//save to localStorage
			$window.localStorage.token = token;
		}
	}
}]);

//Emit Unauthorized
Auth.factory('OnUnauthorized', ['$q', '$rootScope', 'AppConfig', function($q, $rootScope, AppConfig){
	return {
		responseError: function(res){
			console.log(res);
			if(res.status == 401){
				$rootScope.$emit(AppConfig.broadcast.Unauthorized);
			}
			return $q.reject(res);
		}
	}
}]);

})();

