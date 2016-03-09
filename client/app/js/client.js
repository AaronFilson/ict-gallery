const angular = require('angular');
require('angular-route');
const galsApp = angular.module('galsApp', ['ngRoute']);

require('./services')(galsApp);

require('./gals')(galsApp);
require('./auth')(galsApp);

galsApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'GalsController',
      templateUrl: '/views/gals_view.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);
