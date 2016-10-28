(function(){
/**
 * @author: H.Linh
 * created on Oct 19, 2016
 */
'use strict';
var Department = angular.module('BlurAdmin.pages.department');

Department.config(['$stateProvider', function($stateProvider){
	$stateProvider.state('main.department.create', {
		url: '/create',
		templateUrl: 'app/pages/department/create/add-department.html',
		title: 'Create',
		controller: 'CreateDepartmentCtrl'
	});
}])

Department.controller('CreateDepartmentCtrl', ['$scope', 'DepartmentAPI', 'toastr', 'AppConfig', 'Storage', 'AntiXSS', function($scope, DepartmentService, toastr, AppConfig, Storage, AntiXSS){

	$scope.add = function(){
		var department = {};
		department.name = AntiXSS.encode($scope.departmentName);
		if($scope.selectedUser)
			department.managerId = $scope.selectedUser.id;
		if($scope.selectedDepartment)
			department.parentDepartmentId = $scope.selectedDepartment.id;
		DepartmentService.create(department).then(function(res){
			//create successfully
			console.log(res);
			var department = res.data.department;
			$scope.departmentList.push(department);
			$scope.$emit(AppConfig.broadcast.AddedDepartment, department);
			toastr.success(AppConfig.msg.DEPARTMENT_CREATED);

			//reset form
			$scope.departmentName = '';
			$scope.selectedUser = undefined;
			$scope.selectedDepartment = undefined;
			$scope.form.$setPristine();
		}).catch(function(res){
			//create fail
			toastr.error(AppConfig.msg.CREATE_DEPARTMENT_ERROR);
		});
	}
}]);

})();