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
.controller('MainCtrl', ['Authenticate', '$state', '$http', '$window', '$scope', function(auth, $state, $http, $window, $scope){
  if(!auth.isAuthenticated()){
    $state.go('login');
    return;
  }

  //add token to request header
  $http.defaults.headers.common.Authorization = 'Bearer ' + $window.localStorage.token;

  $scope.signout = function(){
    delete $http.defaults.headers.common.Authorization;
    delete $window.localStorage.token;
    $state.go('login');
  }
}]);