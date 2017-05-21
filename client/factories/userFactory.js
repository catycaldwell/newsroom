app.factory('userFactory', function($http, $location){
    var factory = {}

    factory.login = function(user){
        $http.post('/login', user).then(function(output){
            if(output.data) {
                $location.url('/dash')
            } else {
                $location.url('/home')
            }
        })
    }

    factory.checkStatus = function(cb){
        $http.get('/checkstatus').then(function(output){
            if(!output.data){
                // $location.url('/')
            } else {
                cb(output.data)
            }
        })
    }

    factory.logOut = function() {
        $http.get('/logOut')
        .then(function() {
            user = {};
            $location.url('/login');
        });
    };

    return factory;
})
