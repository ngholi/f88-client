'use strict';

angular.module('MainApp', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'SessionStorage',
  'ApplicationConfig',
  'BlurAdmin.pages',
  'Auth', 'Login'
]).config(['$stateProvider', 'toastrConfig', '$httpProvider', function($stateProvider, toastrConfig, $httpProvider){
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/login.html',
      title: 'Login',
      controller: 'LoginCtrl'
    })
    .state('main', {
      url: '/home',
      templateUrl: 'layout.html',
      title: '',
      abstract: true,
      controller: 'MainCtrl'
    });

  //config default toast option
  angular.extend(toastrConfig, {
    autoDismiss: false,
    tapToDismiss: true,
    timeOut: '3000',
    extendedTimeOut: '2000',
    progressBar: true,
    maxOpened: 0,    
    newestOnTop: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body'
  });

  //add default action when unauthorized
  $httpProvider.interceptors.push('OnUnauthorized');
}])
.run(['$rootScope', 'AppConfig', 'toastr', '$state', '$window', function($rootScope, AppConfig, toastr, $state, $window){
  $rootScope.$on(AppConfig.broadcast.Unauthorized, function(){
    toastr.error(AppConfig.msg.FORCE_OUT_UNAUTHORIZED, AppConfig.msg.UNAUTHORIZED);
    $state.go('login');
    delete $window.localStorage.token;
    delete $http.defaults.headers.common.Authorization;
  });
}])
.controller('MainCtrl', ['Authenticate', '$state', '$http', '$window', '$scope', 'Storage', 'UserAPI', 'AppConfig', 'DepartmentAPI',
  function(auth, $state, $http, $window, $scope, Storage, userApi, AppConfig, departmentApi){
  if(!auth.isAuthenticated()){
    $state.go('login');
    return;
  }

  //add token to request header
  $http.defaults.headers.common.Authorization = 'Bearer ' + $window.localStorage.token;

  //fetch all user and department from server
  if(!Storage.get(AppConfig.storage.users)){
    userApi.all().then(function(res){
      //successfully, save data to storage
      Storage.set(AppConfig.storage.users, res.data.users);
      console.log(res.data.users, Storage.get(AppConfig.storage.users));
      $scope.$broadcast(AppConfig.broadcast.GetAllUsersDone);
    });
  }
  if(!Storage.get(AppConfig.storage.departments)){
    departmentApi.all().then(function(res){
      //successfully, save data to storage
      Storage.set(AppConfig.storage.departments, res.data.departments);
      $scope.$broadcast(AppConfig.broadcast.GetAllDepartmentsDone);
    });
  }

  $scope.signout = function(){
    delete $http.defaults.headers.common.Authorization;
    delete $window.localStorage.token;
    $state.go('login');
  }
}]);