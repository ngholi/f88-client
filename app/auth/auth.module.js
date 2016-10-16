(function(){

'use strict';
var Auth = angular.module('Auth', ['ui.router']);

Auth.factory('Authenticate', ['$http','AppConfig', '$window', function($http, AppConfig, $window){
	return {
		login: function(user){
			return $http.post(AppConfig.loginUrl, user);
		},
		register: function(user){

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

})();

