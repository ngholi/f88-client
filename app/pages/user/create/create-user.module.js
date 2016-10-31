/**
 * @author H.Linh
 * created on 16.10.2016
 */
(function () {
  'use strict';

  angular.module('Pages.user')
    .config(routeConfig)

    .controller('RegisterCtrl', ['$scope', 'UserAPI', 'toastr', 'AppConfig', '$timeout', function($scope, userApi, toastr, AppConfig, $timeout){
      $scope.user = {};
      $scope.completePercent = function(){
        var required = ['email', 'name', 'password', 'confirm'];
        var count = 0;
        required.forEach(function(value){
          if(checkValid(value)){
            count++;
          }
        }, count);
        return count / required.length;
      }

      $scope.signup = function(){
        $scope.$broadcast(AppConfig.broadcast.SubmitForm);
        if($scope.completePercent() < 1){
          toastr.info(AppConfig.msg.NOT_FILL_ALL_REQUIRED_FIELD);
          return;
        }
        var signupToast;

        //Creating user toast appear when slow connection, 300ms after hit signup
        var timeout = $timeout(function(){
          signupToast = toastr.info(AppConfig.msg.CREATING_NEW_USER);
        }, 300);
        userApi.create($scope.user).then(function(res){
          //signup successfully
          $timeout.cancel(timeout);
          if(signupToast)
            toastr.clear(signupToast);
          toastr.success(AppConfig.msg.USER_CREATED);
        }, function(res){
          //signup fail
          $timeout.cancel(timeout);
          if(signupToast)
            toastr.clear(signupToast);
          if(typeof res.data.message == 'object'){
            if(res.data.message.original.errno == AppConfig.sqlError.ER_DUP_ENTRY){
              //The unique column has been duplicate, that is email
              toastr.error(AppConfig.msg.CREATE_USER_ERROR, AppConfig.msg.USER_EXISTS);
            }
          }
          else{
            toastr.error(AppConfig.msg.CREATE_USER_ERROR, res.data.message);
          }
        });
      }

      function checkValid(value){
        try{
          if(value == 'email')
            return $scope.user[value].search(/^.+@(\w|\.)+$/i) >= 0;
          else if(value == 'name')
            return $scope.user[value].search(/^\w{3}[\w|\s]*$/i) >= 0;
          else if(value == 'password')
            return $scope.user[value].search(/^.{8}.*$/i) >= 0;
          else if(value == 'confirm'){
            return $scope.user[value].search(/^.{8}.*$/i) >= 0 && $scope.user.password === $scope.user.confirm;
          }
        }catch(err){
          return false;
        }
      }
    }])

    .filter('percent', function(){
      return function(input){
        return input*100 + '%';
      }
    })

    .directive('formSubmitted', function(AppConfig){
      return {
        restrict: 'A',
        require: 'form',
        link: function(scope, elem, attr, ctrl){
          ctrl.$submitted = false;
          scope.$on(AppConfig.broadcast.SubmitForm, function(){
            ctrl.$submitted = true;
          });
        }
      };
    });
  ;

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('main.user.create-user', {
          url: '/create-user',
          templateUrl: 'app/pages/user/create/create-user.html',
          title: 'Create User',
          sidebarMeta: {
            icon: 'ion-person-add',
            order: 600,
          },
          controller: 'RegisterCtrl'
        });
  }

})();
