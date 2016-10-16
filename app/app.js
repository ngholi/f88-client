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
  'ApplicationConfig',
  'BlurAdmin.pages',
  'Auth', 'Login'
]).config(['$stateProvider', function($stateProvider){
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/login.html',
      title: 'Login',
      controller: 'LoginCtrl'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'layout.html',
      title: '',
      abstract: true,
      controller: 'MainCtrl'
    })
}]).controller('MainCtrl', ['Authenticate', '$state', '$http', '$window', '$scope', function(auth, $state, $http, $window, $scope){
  if(!auth.isAuthenticated()){
    $state.go('login');
    return;
  }

  //add token to request header
  $http.defaults.headers.common.Authorization = $window.localStorage.token;
  
  $scope.signout = function(){
    delete $http.defaults.headers.common.Authorization;
    delete $window.localStorage.token;
    $state.go('login');
  }
}]);