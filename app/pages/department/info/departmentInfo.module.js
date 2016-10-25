(function(){
/**
 * @author: H.Linh
 * created on Oct 20, 2016
 */
'use strict';
var Info = angular.module('BlurAdmin.pages.department');

Info.config(['$stateProvider', function($stateProvider){
	$stateProvider.state('main.department.info', {
		url: '/info/{departmentId}',
		templateUrl: 'app/pages/department/info/department-info.html',
		title: 'Department Info',
		controller: 'DepartmentInfoCtrl',
	});
}]);

Info.controller('DepartmentInfoCtrl', ['$stateParams', 'DepartmentNormalize', 'UserNormalize', '$scope', 'DepartmentAPI', 'toastr', 'AppConfig',
	function($stateParams, DepartmentNormalize, UserNormalize, $scope, DepartmentApi, toastr, AppConfig){
	var departmentId = $stateParams.departmentId;
	var department = DepartmentNormalize.get($scope.departmentList, departmentId);
	if(!department) return;
	$scope.departmentName = department.name;
	if(department.managerId){
		$scope.selectedUser = UserNormalize.get($scope.userList, department.managerId);
	}
	if(department.parentDepartmentId){
		$scope.selectedDepartment = DepartmentNormalize.get($scope.departmentList, department.parentDepartmentId);
	}

	$scope.edit = function(){
		var department = {};
		department.departmentId = departmentId;
		department.name = $scope.departmentName;
		if($scope.selectedUser)
			department.managerId = $scope.selectedUser.id;
		if($scope.selectedDepartment){
			department.parentDepartmentId = $scope.selectedDepartment.id;
			console.log(department.departmentId, department.parentDepartmentId);
			if(department.departmentId == department.parentDepartmentId){
				toastr.error(AppConfig.msg.ERROR_SELF_DEPEND, AppConfig.msg.EDIT_FAIL);
				return;
			}
		}
		DepartmentApi.edit(department).then(function(res){
			//successfully
			console.log(res);
			department.id = department.departmentId;
			delete department.departmentId;
			DepartmentNormalize.replace($scope.departmentList, department);
			$scope.$emit(AppConfig.broadcast.EditedDepartment, department);
			toastr.success(AppConfig.msg.EDIT_SUCCESSFULLY);
		}).catch(function(res){
			//fail
			console.log(res);
			toastr.error(AppConfig.msg.EDIT_FAIL);
		});
	}

	window.show = function(){
		return $scope.departmentList;
	}
	window.showSelected = function(){
		return $scope.selectedDepartment;
	}
}]);

})();