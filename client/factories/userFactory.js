

//     factory.checkStatus = function(cb){
//         $http.get('/checkstatus').then(function(output){
//             if(!output.data){
//                 // $location.url('/')
//             } else {
//                 cb(output.data)
//             }
//         })
//     }


app.factory("userFactory", function ($http, $location) {
    var factory = {};

    factory.register = function (user, callback) {
        console.log(user, "in factory");
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

