'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
]).
config(function ($locationProvider) {
 $locationProvider.html5Mode(true);
}).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.when('/line/:coinValue', {templateUrl: 'partials/line.html', controller: 'lineCtrl'});
  $routeProvider.when('/ticker', {templateUrl: 'partials/ticker.html', controller: 'tickerCtrl'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
