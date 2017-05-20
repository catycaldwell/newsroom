app.controller('newsController', function($scope, newsFactory){

    var dat_news = newsFactory.getNewsFromAPI(function(response) {
        if( response.error ) {
        } else {
           console.log("news controller triggered news Factory")
        }
    })

    var dis_news = newsFactory.getNewsTest();
})
