// app.factory('userFactory', function($http, $location){
//     var factory = {}

//     factory.login = function(user){
//         $http.post('/login', user).then(function(output){
//             if(output.data) {
//                 $location.url('/dash')
//             } else {
//                 $location.url('/home')
//             }
//         })
//     }

//     factory.checkStatus = function(cb){
//         $http.get('/checkstatus').then(function(output){
//             if(!output.data){
//                 // $location.url('/')
//             } else {
//                 cb(output.data)
//             }
//         })
//     }

//     factory.logOut = function() {
//         $http.get('/logOut')
//         .then(function() {
//             user = {};
//             $location.url('/login');
//         });
//     };

//     return factory;
// })

app.factory("usersFactory", function ($http, $location) {
    var factory = {};

    factory.register = function (user, callback) {
        $http.post('/register', user).then(function (output) {
            if (typeof (callback) == "function") {
                callback(output);
            }
        })
    };
    factory.login = function (user, callback) {
        $http.post('/login', user).then(function (data) {
            if (typeof (callback) == "function") {
                callback(data);
            }
        })
    };
    factory.logout = function () {
        ;
        $http.get('/logout').then(function (data) {
            if (data.data.status == false) {
                $location.url('/login');
            }
        });
    };
    factory.checkUser = function (callback) {

        $http.get('/check').then(function (data) {
            console.log(data);
            callback(data);
        });
    }
    return factory;
})

