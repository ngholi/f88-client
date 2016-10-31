/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Pages', [
    'ui.router',

    'Pages.dashboard',
    'Pages.user',
    'Pages.department',
    'Security'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/home/dashboard');
  }
})();
