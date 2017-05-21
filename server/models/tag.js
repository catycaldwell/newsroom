console.log('tag models');
var mongoose = require('mongoose');



var CustomerSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true},
	role: { type: String, required: true},
	numberOfTags: {type:Number, default : 0},
	tags: {type: Array},
	graph: {type: Object},
	book: {type: Array},
}, { timestamps: true });

var Customer = mongoose.model('Customer', CustomerSchema);

var TopicSchema = new mongoose.Schema({
	_customer: { type: mongoose.Schema.ObjectId, ref:"Customer"},
	title: { type: String, required: true, minlength: 1, trim: true },
	rank: { type: Number, default: 1 },
	id: {type: Number}
}, { timestamps: true });

var TagGraphSchema = new mongoose.Schema( {
	_customer: { type: mongoose.Schema.ObjectId, ref:"Customer"},
	topic: { type: String, required: true, minlength: 3, trim: true },
	child: { type: String, required: true, minlength: 3, trim: true },
	cost: { type: String, required: true, default: 1 }
}, { timestamps: true } );

var Topic = mongoose.model('Topic', TopicSchema);
var Graph = mongoose.model('Graph', TagGraphSchema);


