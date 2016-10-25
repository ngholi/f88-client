(function(){
/**
 * @author: H.Linh
 * created on Oct 18, 2016
 */
'use strict';
angular.module('BlurAdmin.pages.department', ['ApplicationConfig', 'SessionStorage'])
	.config(['$stateProvider', routeConfig])
	.config(function(){
    $.jstree.defaults.core.themes.url = true;
    $.jstree.defaults.core.themes.dir = "assets/img/theme/vendor/jstree/dist/themes";
  });

function routeConfig($stateProvider){
	$stateProvider.state('main.department', {
		url: '/department',
		templateUrl: 'app/pages/department/department.html',
		title: 'Department',
		controller: 'DepartmentCtrl',
		sidebarMeta: {
			order: 200,
			icon: 'fa fa-bank'
		},
	});
}

})();