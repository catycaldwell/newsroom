// app.controller('usersController', function($scope, userFactory){

//     userFactory.checkStatus(function(data){
//         $scope.activeUser = data;
//         // $location.url('/dash')
//     })

//     $scope.login = function(){
//         userFactory.login($scope.user)
//         $scope.user = {}
//     }

//     $scope.logOut = function() {
//         userFactory.logOut();
//         $scope.user = {};
//     };
// })

app.controller("usersController", ["$scope", "$location", "userFactory", function ($scope, $location, userFactory) {
    $scope.errors = [];
    $scope.user = {};
    $scope.register = function (newUser) {
        $scope.errors = [];
        if (!$scope.newUser || !$scope.newUser.name || !$scope.newUser.password || !$scope.newUser.passwordConfirm || !$scope.newUser.email) {
            $scope.errors.push("All fields required");
        } else { 
            if ($scope.newUser.name.length < 3) {
                $scope.errors.push("Name must be 3 characters long");
            }
            if ($scope.newUser.password.length < 8) {
                $scope.errors.push("Password must be at least 8 characters");
            }
            if ($scope.newUser.password != $scope.newUser.passwordConfirm) {
                $scope.errors.push("Passwords must match");
            }
            if ($scope.errors.length == 0) {
                $scope.user = newUser;
                userFactory.register(newUser, function (data) {
                    if (data.data.status == false) { // is thereany other reason this would return false?
                        $scope.errors.push("Email address is already in use");
                    }
                    else {
                        $scope.newUser = {};
                        $location.path('/dash');
                    }
                })
            }
        }
    };
    $scope.login = function (user) {
        $scope.errors = [];
        if (!$scope.user || !$scope.user.password || !$scope.user.email) {
            $scope.errors.push("All fields required");
        } else {
            $scope.user = user;
            userFactory.login(user, function (data) {
                if (data.data.status == false) {
                    $scope.errors.push("Incorrect login info");
                }
                else {
                    $location.url('/dash');
                }
            })
        }
    }
}])
