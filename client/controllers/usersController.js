app.controller('usersController', function($scope, userFactory){

    userFactory.checkStatus(function(data){
        $scope.activeUser = data;
        // $location.url('/dash')
    })

    $scope.login = function(){
        userFactory.login($scope.user)
        $scope.user = {}
    }

    $scope.logOut = function() {
        userFactory.logOut();
        $scope.user = {};
    };
})
