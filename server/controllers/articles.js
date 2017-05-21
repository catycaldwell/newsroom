var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Article = mongoose.model('ArticleModel');
var ArticleTag = mongoose.model('ArticleTagModel');

module.exports = {

	helpful: function(req,res){
		Article.findOne({ _id: req.body.articleID }, function (err, art) {
			if (art) {
				art.feedback += 1;
				art.save();
				console.log(art);
				res.json(art);
			} else {
				res.json({status: false});
			}
		})
	},
	useless: function(req,res){
		Article.findOne({ _id: req.body.articleID }, function (err, art) {
			if (art) {
				art.feedback -= 1;
				art.save();
				console.log(art);
				res.json(art);
			} else {
				res.json({status: false});
			}
		})
	},
	// Data.find( { $query: { user: req.user }, $orderby: { dateAdded: -1 } } function ( results ) {
	index: function(req,res){
		Article.find({}).sort('-publishedAt').exec(function ( err, data ) {
			res.json(data);
		});
	},
	getArticle: function(req,res){
		Article.findOne({_id: req.params.id}, function ( err, data ) {
			res.json(data);
		});
	},
	importArticles: function(req,res){
		var re = /([^/]+).html/;
		
		// var newTag = new ArticleTag({_article: "592176dc6beb396ad0cedc44", title: "burton", poop:"seagul" });
		// newTag.save();
		
		
		var request = require('request');
		
		request({url: 'https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=13908db4e0c744b59516ee5bda85900f', json: true}, function(error, response, json) {
			if (error) {
				throw error;
			}
			// console.log(json);
			var articles = json.articles;
			for ( var i=0; i < articles.length; i++ ){
				var article = articles[i];
				console.log(article);
				
				// console.log(rgTags);
				var newArticle = new Article({title: article.title, author: article.author, description: article.description,
					publishedAt: article.publishedAt, url: article.url, urlToImage: article.urlToImage});
				var slug = newArticle.url;
				var reMatches = slug.match(re);
				// console.log( slug, reMatches);
				
				var rgTags = reMatches[0].split('-');
				newArticle.tag_list = rgTags;
				newArticle.tag_list.pop(); // get rid of garbage tag
				newArticle.save( function ( err, item, count ) {
					if(err)
					{
						console.log('Something went wrong saving an article...');
						console.log(err.message);
						// res.json(err);
					}
					else
					{
						
						
						// console.log(rgTags);
						for( var j = 0; j < item.tag_list.length; j++ )
						{
							// console.log(rgTags[j]);
							console.log("Adding " + item.tag_list[j] + " to ArticleID " + item._id);
							// var newTag = new ArticleTag({_article: item._id, title: rgTags[j] });
							// console.log(newTag, item._id);
							// newTag.save();
							var test = new ArticleTag({title:item.tag_list[j], _article: item.id});
							test.save();
							console.log(test);
						}
						
					}

				});
				
			}
			res.json(json.articles);
		});
		
		
		// var tag = new Graph(req.body);
		// tag._customer = req.params.id;
		// tag.save( function ( err ) {
		// 	if(err)
		// 	{
		// 		console.log('something went wrong');
		// 		console.log(err.message);
		// 		res.json(err);
		// 	}
		// 	else
		// 	{
		// 		res.json(tag);
		// 	}
		// });
	},
};