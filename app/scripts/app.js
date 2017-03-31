'use strict';

/**
 * @ngdoc overview
 * @name simulatorApp
 * @description
 * # simulatorApp
 *
 * Main module of the application.
 */
angular
  .module('simulatorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.toggle',
    'ui.checkbox'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/Devices', {
        templateUrl: 'views/device_list.html',
        controller: 'DeviceListCtrl',
        controllerAs: 'deviceList'
      })
      .when('/new_device', {
        templateUrl: 'views/new_device.html',
        controller: 'NewDeviceCtrl',
        controllerAs: 'newDevice'
      })
      .when('/Settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .when('/update_device/:device_id', {
        templateUrl: 'views/update_device.html',
        controller: 'UpdateDeviceCtrl',
        controllerAs: 'updateDevice'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.hashPrefix('');
  });
