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

app.controller("usersController", ["$scope", "$location", "usersFactory", function ($scope, $location, usersFactory) {
    $scope.errors = [];
    $scope.user = { firstName: "Liz" };
    $scope.register = function (newUser) {
        console.log(newUser);
        $scope.errors = [];
        if (!$scope.newUser || !$scope.newUser.lastName || !$scope.newUser.firstName || !$scope.newUser.password || !$scope.newUser.passwordConfirm || !$scope.newUser.email || !$scope.newUser.birthday) {
            $scope.errors.push("All fields required");
        } else {
            if ($scope.newUser.firstName.length < 3) {
                $scope.errors.push("First name must be 3 characters long");
            }
            if ($scope.newUser.lastName.length < 3) {
                $scope.errors.push("Last name must be 3 characters long");
            }
            if ($scope.newUser.password.length < 8) {
                $scope.errors.push("Password must be at least 8 characters");
            }
            if ($scope.newUser.password != $scope.newUser.passwordConfirm) {
                $scope.errors.push("Passwords must match");
            }

            if ($scope.errors.length == 0) {
                console.log("Ready to go to the factory!");
                $scope.user = $scope.newUser;
                usersFactory.register(newUser, function (data) {
                    console.log("This data has been to the factory and back");
                    console.log(data);
                    if (data.data.status == false) { // is thereany other reason this would return false?
                        $scope.errors.push("Email address is already in use");
                    }
                    else {
                        $scope.newUser = {};
                        $location.url('/dash');
                    }
                });
            }
        }
    };
    $scope.login = function (user) {
        $scope.errors = [];

        if (!$scope.user || !$scope.user.password || !$scope.user.email) {
            $scope.errors.push("All fields required");
        } else {
            usersFactory.login(user, function (data) {
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
