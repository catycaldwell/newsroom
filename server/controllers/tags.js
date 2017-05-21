var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Topic = mongoose.model('Topic');
var Graph = mongoose.model('Graph');
var ArticleModel = mongoose.model('ArticleModel');


Tag = function(tag, tagid){
    this.tag = tag;
    this.id = tagid;
}

Book = function(customerid){
    this.articles = [];
    this._customer = customerid;
}

Article = function(title, id, tag1, tag2, tag3){
    this.id = id;
    this.title = title;
    this.tag = [tag1, tag2, tag3];
    this.score = 0;
    this.feedback;
}

function adjList(tag1, tag2, tag3) {
    this.vertices = [];
    this.edges = [];
    this.numberOfEdges = 0;
    this.addVertex(tag1);
    this.addVertex(tag2);
    this.addVertex(tag3);
	this.addEdge(tag1, tag2);
	this.addEdge(tag1, tag3);
	this.addEdge(tag2, tag3);
    }

    adjList.prototype.addVertex = function(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = [];
    };
    adjList.prototype.removeVertex = function(vertex) {
    var index = this.vertices.indexOf(vertex);
    if(~index) {
        this.vertices.splice(index, 1);
    }
    while(this.edges[vertex].length) {
        var adjacentVertex = this.edges[vertex].pop();
        this.removeEdge(adjacentVertex, vertex);
    }
    };
    adjList.prototype.addEdge = function(vertex1, vertex2) {
        var obj1 = {};
        obj1[vertex1] = 10;
        var obj2 = {};
        obj2[vertex2] = 10;
        this.edges[vertex1].push(obj2);
        this.edges[vertex2].push(obj1);
        this.numberOfEdges++;
    };
    adjList.prototype.editEdge = function(vertex1, vertex2, vertex3, feedback){
        for(var i = 0; i < this.edges[vertex1].length; i++){
            if(this.edges[vertex1][i].hasOwnProperty(vertex2)){
                this.edges[vertex1][i][vertex2] += feedback;
                break;
            }
        }
        for(i = 0; i < this.edges[vertex2].length; i++){
            if(this.edges[vertex2][i].hasOwnProperty(vertex1)){
                this.edges[vertex2][i][vertex1] += feedback;
                break;
            }
        }
         for(var i = 0; i < this.edges[vertex1].length; i++){
            if(this.edges[vertex1][i].hasOwnProperty(vertex3)){
                this.edges[vertex1][i][vertex3] += feedback;
                break;
            }
        }
        console.log(vertex3);
        console.log(this.edges[vertex3]);               
        for(i = 0; i < this.edges[vertex3].length; i++){
            if(this.edges[vertex3][i].hasOwnProperty(vertex1)){
                this.edges[vertex3][i][vertex1] += feedback;
                break;
            }
        }
    };
    adjList.prototype.articleScore = function(tag1, tag2, tag3){
		console.log(tag3, "is this the problem????");
        var score = 0;
        var found = 0;
        for(var i = 0; i < this.edges[tag1].length; i++){
            if(this.edges[tag1][i].hasOwnProperty(tag2)){
                score += this.edges[tag1][i][tag2];
                found = 1;
                break;
            }
        }
		console.log(found);
        if(found != 1){ //they didn't find the tag
            this.addVertex(tag2);
			console.log("tag2 has been added!!!");
            this.addEdge(tag1, tag2);
			console.log("edge added!");
            score += 10;
        }
        found = 0;
        for(i = 0; i < this.edges[tag1].length; i++){
            if(this.edges[tag1][i].hasOwnProperty(tag3)){
                // console.log(this.edges[tag1][i][tag3]);
                score += this.edges[tag1][i][tag3];
                found = 1;
                break;
            }
        }
        if(found != 1){ //they didn't find the tag
            this.addVertex(tag3);
			console.log("tag2 has been added!!!");
            this.addEdge(tag1, tag3);
			console.log("edge added!");
            score += 10;
            found = 0;
        }
        // console.log("score incoming");
        // console.log(score);
        return score;
    }
    adjList.prototype.removeEdge = function(vertex1, vertex2) {
    var index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
    var index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;
    if(~index1) {
        this.edges[vertex1].splice(index1, 1);
        this.numberOfEdges--;
    }
    if(~index2) {
        this.edges[vertex2].splice(index2, 1);
    }
};

// Customer = function(title, tag1, tag2, tag3){
//     var id = 1;
//     var tag1 = new Tag(tag1, 0, id);
//     var tag2 = new Tag(tag2, 1, id);
//     var tag3 = new Tag(tag3, 2, id);
//     var tags = [tag1, tag2, tag3];
//     this.title = title;
//     this.book = [];
//     this.tags = [tag1, tag2, tag3]; 
//     this.graph = new Graph();
// }

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
				console.log("error!!!!");
				console.log(err.message);
				res.json(err);
			} else {
				var arrOfNeeds = req.body.needs.split(',');
				var count = 0;
				cust.tags = [];
				for (var i = 0; i < arrOfNeeds.length; i++){
					var topic = new Topic ({
						_customer: cust._id,
						title: arrOfNeeds[i],
						id: count,
					})
					cust.tags.push(topic);
					topic.save();
					count++;
				}
				var book = new Book(cust._id);
				// Topic.find({_customer: req.params.id}).sort('rank').exec(function ( err, data ) {
				var articles = ArticleModel.find({}).exec(function(err,articles){
						console.log(articles, "articles!!!");
	
						cust.graph = new adjList(cust.tags[0].id, cust.tags[1].id, cust.tags[2].id); // three numbers that are associated with the tags
						// console.log(cust.graph.vertices.length, "length");
						
						// console.log(articles[0].tag_list[0], "is this a tag???")
						for(i = 0; i < articles.length; i++){
							for(var j = 0; j< 3; j++){
								if(typeof(articles[i].tag_list[j]) != 'number'
								){
									topic = new Topic({
									_customer: cust._id,
									title: articles[i].tag_list[j],
									id: count,
								})
								articles[i].tag_list[j] = topic;
								topic.save();
								count++;
								}
							}
						}
						for(i = 0; i < articles.length; i++){
							articles[i].score = cust.graph.articleScore(1, articles[0].tag_list[0].id, articles[0].tag_list[1].id);
						}	
						console.log(articles[0].score, "score!!!!!!!!!!!!");
						// console.log(articles[0].tag_list[0]);
						console.log(cust.graph, "graph?????");
						cust.book = articles;
						console.log(cust.book, "BOOOOOOOOOOOOOOOOOOK!!")
						cust.numberOfTags = count;
						console.log(cust);
						cust.save( function(e, c){
							if(e)
							{
								console.log("huh?", e.message)
							}
							var successMsg = "Whatever floats your bacon";
							// console.log(c);
							res.json(c);
						});
						
				});
			
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