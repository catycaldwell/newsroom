var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/landing.html',
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
    .when('/brief', {
        templateUrl: 'partials/brief.html',
        controller: 'usersController'
    })
    .when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'usersController'
    })
    .when('/landing', {
        templateUrl: 'partials/landing.html',
        controller: 'usersController'
    })
    .when('/survey', {
        templateUrl: 'partials/survey.html',
        controller: 'usersController'
    })
    .otherwise({
        redirectTo: 'partials/login.html'
    })
})