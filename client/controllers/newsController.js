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

    function bubble(arr){
    var counter = 0;
    for( var i = 0; i< arr.length; i++){
        if(arr[i+1].score < arr[i].score){
            swap(arr, i, i+1);
            counter ++;
        }
    }
    if(counter == 0){
        return arr;
    }
    return bubble(arr);
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
        $scope.articles//change the score
        for(var i = 0; i < $scope.articles.length; i++){
            if($scope.articles[i]._id = bacon){
                $scope.articles[i].score += 2;
            }
        }
        bubble($scope.articles);
        newsFactory.helpful({bacon}, function (){
        })
    }

    $scope.useless = function (article) {
        article.disabled = true;
        var bacon = article._id;
        for(var i = 0; i < $scope.articles.length; i++){
            if($scope.articles[i]._id = bacon){
                $scope.articles[i].score -= 2;
            }
        }
        bubble($scope.articles);
        newsFactory.useless({bacon}, function (){
        })
    }

})