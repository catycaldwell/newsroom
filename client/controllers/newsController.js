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
})
//   for (var i = 0; i < data.articles.length; i++) {
//                 var bacon = data.articles[i].description;
//                 if (bacon.includes("Trump")) {
//                     console.log(data.articles[i])
//                 }
//             }