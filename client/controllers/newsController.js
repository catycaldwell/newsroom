app.controller('newsController', function($scope, $location, newsFactory){
    $scope.articles;

// this is a basic API response from a news source we can use for dummy data for formatting. 
    var dat_news = function () {
        var articles = [];
        newsFactory.getNews(function(response) {
            console.log("hi mom", response)
            if( response.error ) {
                console.log(error)
            } else {
                articles = response.data;
            }
            $scope.articles = articles;
            console.log("articles:", $scope.articles);
        }); 
    };
    dat_news();
    var dis_news = newsFactory.getNewsTest(function(response) {

    });

    $scope.addProfile = function () {
        newsFactory.addProfile($scope.newProfile, function(data){
            console.log(data, "this is what we got back from the factory")
            console.log(data.book, "book back in controller!!");
            $scope.articles = data.book;
            $location.url('/brief');
        });
        $scope.newProfile = {};
    }


})
//   for (var i = 0; i < data.articles.length; i++) {
//                 var bacon = data.articles[i].description;
//                 if (bacon.includes("Trump")) {
//                     console.log(data.articles[i])
//                 }
//             }