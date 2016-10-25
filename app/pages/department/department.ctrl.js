(function(){
/**
 * @author: H.Linh
 * created on Oct 18, 2016
 */ 
 'use strict';
 var Department = angular.module('BlurAdmin.pages.department');
 
 Department.controller('DepartmentCtrl', ['$scope', '$state', 'Storage', 'AppConfig', 'DepartmentNormalize', '$timeout', 
  function($scope, $state, Storage, AppConfig, Normalize, $timeout){
 	$scope.basicConfig = {
      core: {
        multiple: false,
        check_callback: true,
        worker: true
      },
      'types': {
        'folder': {
          'icon': 'ion-ios-folder'
        },
        'default': {
          'icon': 'ion-document-text'
        }
      },
      'plugins': ['types'],
      'version': 1
    };

    $scope.ignoreChanges = false;

  $scope.treeEventObj = {
    select_node: function(e, data){
      $state.go('main.department.info', {departmentId: data.selected[0]});
    },
    ready: function(){
      $timeout(function(){
        $scope.ignoreChanges =false;
      });
    }
  };

  if(!Storage.get(AppConfig.storage.departments)){
    $scope.$on(AppConfig.broadcast.GetAllDepartmentsDone, function(){
      let departmentList = Storage.get(AppConfig.storage.departments);
      $scope.treeData = Normalize.toTree(departmentList);
      $scope.departmentList = departmentList;
    });
  }
  else{
    let departmentList = Storage.get(AppConfig.storage.departments);
    $scope.treeData = Normalize.toTree(departmentList);
    $scope.departmentList = departmentList;
  }
  if(!Storage.get(AppConfig.storage.users)){
    $scope.$on(AppConfig.broadcast.GetAllUsersDone, function(){
      $scope.userList = Storage.get(AppConfig.storage.users);
    });
  }
  else{
    $scope.userList = Storage.get(AppConfig.storage.users);
  }

  $scope.applyModelChange = function(){
  	return !$scope.ignoreChanges;
  }

  $scope.openAddDepartment = function(){
    $scope.treeInstance = this.treeInstance;
  	$state.go('main.department.create');
  }

  $scope.expand = function () {
    $scope.ignoreChanges = true;
    $scope.treeData.forEach(function (n) {
      n.state.opened = true;
    });
    $scope.basicConfig.version++;
  };

  $scope.collapse = function () {
    $scope.ignoreChanges = true;
    $scope.treeData.forEach(function (n) {
      n.state.opened = false;
    });
    $scope.basicConfig.version++;
  };

  $scope.refresh = function(){
    $scope.ignoreChanges = true;
    $scope.basicConfig.version++;
  }

  $scope.$on(AppConfig.broadcast.EditedDepartment, function(e, department){
    //save to storage
    Storage.set(AppConfig.storage.departments, $scope.departmentList.map(function(value){
      return {
        id: value.id,
        managerId: value.managerId,
        name: value.name,
        parentDepartmentId: value.parentDepartmentId
      }
    }));

    //update tree
    var selected = $scope.treeData[Normalize.getIndex($scope.treeData, department.id)];
    selected.text = department.name;
    selected.parent = department.parentDepartmentId || '#';
    $scope.basicConfig.version++;
  });
  $scope.$on(AppConfig.broadcast.AddedDepartment, function(e, department){
    Storage.set(AppConfig.storage.departments, $scope.departmentList.map(function(value){
      return {
        id: value.id,
        managerId: value.managerId,
        name: value.name,
        parentDepartmentId: value.parentDepartmentId
      }
    }));

    //update tree
    $scope.treeData.push({
      id: department.id,
      parent: department.parentDepartmentId || '#',
      type: 'folder',
      text: department.name,
      state: {
        opened: false
      }
    });
    $scope.basicConfig.version++;
  });
 }]);

})();