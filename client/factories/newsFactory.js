app.factory('newsFactory', function($http, $location, $route){
    var factory = {};
    var dat_book = [];

    factory.helpful = function(article, callback){
        $http.post('/helpful', article).then(function(res){
            callback(res);
        });
    }

    factory.useless = function(article, callback){
        $http.post('/useless', article).then(function(res){
            callback(res);
        });
    }

    factory.addProfile = function(profile, cb){
        $http.post('/addProfile', profile).then(function(data){
            dat_book = data.data;
            $location.url('/brief');
        })
    }

    factory.getNews = function(cb){
        if (dat_book.book) {
            res = {};
            res.data=dat_book.book
            cb(res);
        } else {
            $http.get('/articles').then(function ( res ) {
			    cb(res);
		    });
        }
    };

    return factory;
})
