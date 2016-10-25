(function(){
/**
 * @author: H.Linh
 * created on Oct 19, 2016
 */
 'use strict';
var User = angular.module('BlurAdmin.pages.user');

User.factory('UserAPI', ['$http', 'AppConfig', '$q', function($http, AppConfig, $q){
	return {
		create: function(user){
			return $http.post(AppConfig.api.signupUrl, user);
		},
		all: function(){
			return $http.get(AppConfig.api.allUser).then(function(res){
				//successfully, convert data first
				var converted = res.data.users.map(function(value){
					return {
						id: value.id,
						name: value.name,
						email: value.email,
						phoneNumber: value.phoneNumber,
						departmentId: value.departmentId
					};
				});
				res.data.users = converted;
				return $q.resolve(res);
			});
		}
	}
}]);

User.factory('UserNormalize', function(){
	return {
		get: function(userList, id){
			return userList.filter(function(value){
				return value.id == id;
			})[0];
		}
	}
});

})();