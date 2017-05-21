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
    .when('/dash', {
        templateUrl: 'partials/dash.html',
        controller: 'usersController'
    })
    .otherwise({
        redirectTo: 'partials/login.html'
    });
})
// .directive('navBar', function() {
//     return {
//         restrict: 'E',
//         templateUrl: '/partials/navbar.html'
//     };
// })
// .directive('enavBar', function() {
//     return {
//         restrict: 'E',
//         templateUrl: '/partials/easternav.html'
//     };
// })
// .directive('footer', function() {
//     return {
//         restrict: 'E',
//         templateUrl: '/partials/footer.html'
//     };
// })
