'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('/app/timeline');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
              .state('app.timeline', {
                  url: '/timeline',
                  templateUrl: 'tpl/apps_timeline.html',
                  resolve: {
                  }
              })
              .state('app.scheduler', {
                  url: '/scheduler',
                  templateUrl: 'tpl/scheduler.html',
                  resolve: {
                  }

              })
              .state('app.timeline-model', {
                  url: '/timeline-model/:appType',
                  templateUrl: 'tpl/apps_timeline.html',
                  resolve: {
                  }
              })
      }
    ]
  );