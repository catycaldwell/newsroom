app.controller('newsController', function($scope, $location, newsFactory){
    $scope.articles;

// this is a basic API response from a news source we can use for dummy data for formatting. 
    var dat_news = function () {
        var articles = [];
        newsFactory.getNews(function(response) {
            if( response.error ) {
                console.log(error)
            } else {
                articles = response.data;
            }
            $scope.articles = articles;
        }); 
    };

    dat_news();

    $scope.addProfile = function () {
        newsFactory.addProfile($scope.newProfile, function(data){
            $scope.articles = data.book;
            $location.url('/brief');
        });
        $scope.newProfile = {};
    }

    $scope.helpful = function (article) {
        article.disabled = true;
        var bacon = article._id;
        newsFactory.helpful({bacon}, function (){
        })
    }

    $scope.useless = function (article) {
        article.disabled = true;
        var bacon = article._id;
        newsFactory.useless({bacon}, function (){
        })
    }
})