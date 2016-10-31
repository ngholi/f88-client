(function(){
/**
 * @author: H.Linh
 * created on Oct 19, 2016
 */
 'use strict';
 var Department = angular.module('Pages.department');

 Department.factory('DepartmentAPI', ['$http', 'AppConfig', '$q', function($http, AppConfig, $q){
 	return {
 		create: function(department){
 			return $http.post(AppConfig.api.createDepartment, department);
 		},
 		all: function(){
 			return $http.get(AppConfig.api.allDepartment).then(function(res){
 				//successfully
 				var converted = res.data.departments.map(function(value){
 					return {
 						id: value.id,
 						name: value.name,
 						managerId: value.managerId,
 						parentDepartmentId: value.parentDepartmentId
 					};
 				});
 				res.data.departments = converted;
 				return $q.resolve(res);
 			});
 		},
 		edit: function(department){
 			return $http.post(AppConfig.api.editDepartment, department);
 		}
 	}
 }]);

 Department.factory('DepartmentNormalize', ['AntiXSS', function(AntiXSS){
  	return {
  		toTree: function(departmentList){
  			return departmentList.map(function(value){
  				return {
 			        id: value.id,
 			        parent: value.parentDepartmentId || '#',
 			        type: 'folder',
 			        text: AntiXSS.encode(value.name),
 			        state: {
 			            opened: false
 			        }
 		        };
  			});
  		},
  		get: function(departmentList, id){
  			return departmentList.filter(function(value){
  				return value.id == id;
  			})[0];
  		},
  		getIndex: function(departmentList, id){
  			return departmentList.findIndex(function(value){
  				return value.id == id;
  			});
  		},
  		replace: function(departmentList, department){
  			var index = this.getIndex(departmentList, department.id);
  			if(index > -1)
  				departmentList[index] = department;
  		},
  		add: function(departmentList, department){
  			departmentList.push(department);
  		}
  	};
  }]);


})();