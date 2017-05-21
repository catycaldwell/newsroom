app.factory('newsFactory', function($http, $location, $route){
    var factory = {};

    factory.index = function(callback){
        $http.get('/index').then(function(output){
            polls = output.data;
            callback(polls);
        })
    }

    factory.addProfile = function(profile, cb){
        $http.post('/addProfile', profile).then(function(data){
            console.log(data.data, "this is back from the db! What do we see????");
            tehBook = data.data;
            $location.url('/brief');
        })
    }

    factory.getNews = function(cb){
            $http.get('/articles').then(function ( res ) {
			console.log("News from DB:", res);
			cb(res);
		});
    };

    factory.getNewsFromAPI = function(cb){
		$http.get('https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=13908db4e0c744b59516ee5bda85900f').then(function ( res ) {
			console.log("News API:", res.data);
			cb(res.data);
		});
    };
    // factory.getNewsFromAPI = function(callback) {
    //     fetch('https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=13908db4e0c744b59516ee5bda85900f')
    //     .then((response) => response.json())
    //     .then(function(data) {
    //         // if certain tag constraints are met, add specific articles to our database
    //         callback(data)
    //     })
    //     .catch(function(error) {
    //         console.log("your api call didnt work");
    //     })
    // };

    factory.getNewsTest = function(callback) {
        fetch('https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=13908db4e0c744b59516ee5bda85900f')
        .then((response) => response.json())
        .then(function(data) {
            for (var i = 0; i < data.articles.length; i++) {
                var bacon = data.articles[i].description;
                if (bacon.includes("Trump")) {
                    console.log(data.articles[i])
                }
            }
        })
        .catch(function(error) {
            console.log("your api call didnt work");
        })   
    }


    // factory.getPoll = function(id, callback){
    //     $http.get('/poll/' + id).then(function(res) {
    //         if (!res.data.error) {
    //             poll = res.data;
    //         }
    //         if (typeof(callback) === 'function') {
    //             callback(poll);
    //         }
    //     });
    // }

    // factory.delete = function(id, callback) {
    //     $http.delete('/poll/' + id).then(function(res) {
    //         if (typeof(callback) === 'function') {
    //             callback(res);
    //         }
    //     });
    // }

    return factory;
})
