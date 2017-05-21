app.controller('newsController', function($scope, newsFactory){
    $scope.articles;

// this is a basic API response from a news source we can use for dummy data for formatting. 
    var dat_news = function () {
        $scope.burton = "no mam";
        var articles = [];
            newsFactory.getNewsFromAPI(function(response) {
                if( response.error ) {
                    console.log(error)
                } else {
                    articles = response.articles;
                }
                $scope.articles = articles;
                console.log($scope.articles, "are these the articles from the factory?")
            });
        
    };
    dat_news();
    var dis_news = newsFactory.getNewsTest(function(response) {

    });

    $scope.addProfile = function () {
        newsFactory.addProfile($scope.newProfile);
        $scope.newProfile = {};
    }


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
                console.log($scope.user);
                userFactory.register(newUser, function (data) {
                    if (data.data.status == false) { // is thereany other reason this would return false?
                        $scope.errors.push("Email address is already in use");
                    }
                    else {
                        $scope.newUser = {};
                        console.log("redirecting with dash")
                        $location.path('/dash');
                    }
                })
            }
        }
    };
})
//   for (var i = 0; i < data.articles.length; i++) {
//                 var bacon = data.articles[i].description;
//                 if (bacon.includes("Trump")) {
//                     console.log(data.articles[i])
//                 }
//             }