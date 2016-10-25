(function(){
/**
 * @author: H.Linh
 * created on Oct 19, 2016
 */
 'use strict';
 var User = angular.module('BlurAdmin.pages.user', ['Auth', 'ApplicationConfig']);

 User.config(['$stateProvider', function($stateProvider){
 	$stateProvider.state('main.user', {
 		url: '/user',
 		title: 'User',
 		abstract: true,
 		template: '<ui-view></ui-view>',
 		sidebarMeta: {
 			icon: 'ion-android-people',
 			order: 300
 		}
 	})
 }]);

})();