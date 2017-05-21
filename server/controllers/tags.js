var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Topic = mongoose.model('Topic');
var Graph = mongoose.model('Graph');

module.exports = {
	// Data.find( { $query: { user: req.user }, $orderby: { dateAdded: -1 } } function ( results ) {
	index: function(req,res){
		console.log("Tags.Index");
		Topic.find({_customer: req.params.id}).sort('rank').exec(function ( err, data ) {
			console.log("Index Data:", data);
			res.json(data);
		});
	},
	getGraph: function(req,res){
		console.log("Tags.getGraph");
		Graph.find({_customer: req.params.customer_id}, function ( err, data ) {
			console.log("getGraph Data:", data);
			res.json(data);
		});
	},
	createTag: function(req,res){
		console.log("Received create tag request for user", req.params.id, ":", req.body);
		var tag = new Graph(req.body);
		tag._customer = req.params.id;
		tag.save( function ( err ) {
			if(err)
			{
				console.log('something went wrong');
				console.log(err.message);
				res.json(err);
			}
			else
			{
				res.json(tag);
			}
		});
	},
	createTopic: function(req,res){
		console.log("Received create topic request for user", req.params.id, ":", req.body);
		var topic = new Topic(req.body);
		topic._customer = req.params.id;
		topic.save( function ( err ) {
			if(err)
			{
				console.log('something went wrong');
				console.log(err.message);
				res.json(err);
			}
			else
			{
				res.json(topic);
			}
		});
	},
	createUser: function ( req, res ) {
		console.log( "Received create user request...", req.body, req.params);
		var customer = new Customer({title:req.body.title});
		customer.save( function ( err ) {
			if (err)
			{
				console.log("something went wrong");
				console.log(err.message);
				res.json(err);
			}
			else
			{
				res.json(customer);
			}
		})
	},
	addProfile: function (req, res) {
		var customer = new Customer({title:req.body.title, role:req.body.role});
		customer.save(function(err, cust) {
			if (err) {
				res.json(err);
			} else {
				var arrOfNeeds = req.body.needs.split(',');
				for (var i = 0; i < arrOfNeeds; i++) {
					var topic = new Topic ({
						_customer: cust._id,
						title: arrOfNeeds[i]
					})
				}
				var successMsg = "Whatever floats your bacon";
				res.json(successMsg);
			}
		})
	}
	// vote: function(req,res){
	// 	console.log("Received Vote request:", req.params, req.body);
	// 	var OPT = "option" + req.body.data.option + "_vote";
	// 	Poll.findOne({_id: req.params.id}, function ( err, data ) {
	// 		console.log(err, data);
	// 		if(err)
	// 		{
	// 			console.log('something went wrong');
	// 			console.log(err.message);
	// 			res.json(err);
	// 		}
	// 		else
	// 		{
	//
	// 			PollVote.findOne({_user: req.body.data._user, _poll: req.body.data._poll}, function ( err, voteRecord ) {
	// 				console.log(err, voteRecord);
	// 				if( voteRecord ){
	// 					res.json({errors: {pollVote: { message: "You have already voted! You picked #" + voteRecord.option}}})
	// 				}
	// 				else {
	// 					console.log(data[OPT]);
	// 					if( !data[OPT] ){
	// 						data[OPT] = 1;
	// 					}
	// 					else{
	// 						data[OPT] += 1;
	// 					}
	// 					data.save();
	// 					var pv = new PollVote(req.body.data);
	// 					pv.save();
	// 					res.json(data);
	// 				}
	// 			});
	//
	// 		}
	// 	});
	// },
	// delete: function(req,res){
	// 	Poll.remove({_id:req.params.id}, function(err, data) {
	// 		console.log("Error:", err);
	// 		res.json(err);
	// 	});
	// },
};