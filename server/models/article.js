console.log('article models');
var mongoose = require('mongoose');



var ArticleSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true},
	author: { type: String, trim: true }, // "Al Jazeera"
	description: { type: String, trim: true }, // "The first day of Ramadan fasting will be confirmed on Friday."
	publishedAt: { type: Date}, // "2017-05-21T06:54:53Z"
	url: { type: String }, // "http://www.aljazeera.com/news/2017/04/ramadan-fasting-start-date-170427062743037.html"
	urlToImage: { type: String }, // "http://www.aljazeera.com/mritems/Images/2017/4/30/2a2a297a9fd040878549e1ad2ae3b60f_18.jpg"
}, { timestamps: true });

var Article = mongoose.model('ArticleModel', ArticleSchema);

var ArticleTagSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true},
	_article: { type: mongoose.Schema.ObjectId, ref:"Article" }
});
var Burton = mongoose.model('ArticleTagModel', ArticleTagSchema);


