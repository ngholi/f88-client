(function(){
/**
 * @author: H.Linh
 * created on Oct 19, 2010
 * @descript: This module provider the way to cache data
 * was fetched from server, using window.sessionStorage
 */
 'use strict';
 var storage = angular.module('SessionStorage', []);

storage.factory('Storage', ['$window', function($window){
	return {
		set: function(key, value){
			if(typeof value == 'object'){
				$window.sessionStorage[key] = JSON.stringify(value);
			}
			else
				$window.sessionStorage[key] = value;
		},
		get: function(key){
			var value = $window.sessionStorage[key];
			if(!value)
				return value;
			try{
				return JSON.parse(value);
			}
			catch(err){
				return value;
			}
		},
		remove: function(key){
			delete $window.sessionStorage[key];
		}
	}
}]);

})();