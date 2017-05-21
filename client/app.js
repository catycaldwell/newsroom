var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/home.html',
    })
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'usersController'
    })
    .when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'usersController'
    })
    .when('/dash', {
        templateUrl: 'partials/dash.html',
        controller: 'usersController'
    })
    .otherwise({
        redirectTo: 'partials/login.html'
    });
})