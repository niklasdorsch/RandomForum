var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');



var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/myappdatabase');
var db = mongoose.connection;

var User    = require('./model/user');
var Post    = require('./model/post');
var Comment = require('./model/comment');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // TODO: logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

//===============================================

//===============================================

router.route('/user')
    .post(function(req, res) { // Add a user with name and password
        var user = new User();      
        user.name = req.body.name;  
        user.pass = req.body.pass;  
        user.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'User created!' });
        });

    })
router.route('/user/:id') //gets the name using the id
    .get(function(req, res) {
        var user = new User();     
        User.findById( req.params.id, 'name',
                   function (err, person) {
                        if (err) return handleError(err);
                        res.json(person);

                    });
    })

router.route('/user/pic') //gets the name using the id
    .put(function(req, res) {
        User.findById(req.body.id, function(err, user) {

            if (err)
                res.send(err);

            user.profilePicUrl = req.body.newUrl;  // update the posts info

            // save the post
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Prof pic updated!' });
            });

        });
    });

router.route('/user/pic/:id')
    // test if user and pass match
    .get(function(req, res) {
        var user = new User();     
        User.findById( req.params.id, 'profilePicUrl',
                   function (err, person) {
                        if (err) return handleError(err);
                        res.json(person);

                    });
    });


router.route('/user/:name/:pass')
    // test if user and pass match
    .get(function(req, res) {
        // save the post and check for errors
        User.find({ 'name': req.params.name,
                    'pass': req.params.pass},
                  'name pass',
                   function (err, person) {
            if (err) return handleError(err);
            if(person.length == 1) {
                res.json({id:person[0].id,
                          name:person[0].name,
                          login: true,
                          message: "login successful"});
            } else {
              res.json({id:null,
                        login: false,
                        message: "login failed"});

            }
        })
    });




//===============================================

router.route('/post')
    // create a post 
    .post(function(req, res) {
        var post = new Post();      // create a new instance of the post model
        post.author = req.body.author;  
        post.authorID = req.body.authorID;  
        post.content = req.body.content;

        // save the post and check for errors
        post.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Post created!' });
        });

    })


  
    .put(function(req, res) {
        console.log(req.body); // update a post
        // use our post model to find the post we want
        Post.findById(req.body.id, function(err, post) {

            if (err)
                res.send(err);

            post.content = req.body.updatedContent;  // update the posts info

            // save the post
            post.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Post updated!' });
            });

        });
    });

//===============================================

router.route('/post/:currentID')
    .get(function(req, res) {
        // get all posts
        Post.find().sort({createdAt: -1}).exec( function (err, post) {
            for (var i = 0; i < post.length; i++) {
                post[i] = post[i].toObject();
                if(post[i].authorID != req.params.currentID) {
                    post[i].canUpdate = false;
                }
                var comments = post[i].comments;
                for (var j = 0; j < comments.length; j++) {
                    if(comments[j].authorID != req.params.currentID) {
                        comments[j].canUpdate = false;
                    }
                }
            }
            if (err)
                res.send(err);
            res.json(post);
        });
    })

//===============================================
router.route('/post/comment')
    .put(function(req, res) {
        console.log(req.body);
        Post.findOneAndUpdate(
            { "_id": req.body.postID, "comments._id": req.body.commentID },
            { 
                "$set": {
                    "comments.$.content": req.body.content
                }
            },
            function(err,doc) {
                console.log(doc)
                if (err)
                    res.send(err);

                res.json({  result : doc,
                    message: 'Post updated!' });
            }
        );
    
    });
//===============================================
router.route('/comment/:postID')

    // create a post (accessed at POST http://localhost:8080/api/posts)
     .put(function(req, res) {

        // use our post model to find the post we want
        Post.findById(req.params.postID, function(err, post) {

            if (err || !post)
                res.send(err);
            var comment = new Comment();
            comment.author = req.body.author;
            comment.authorID = req.body.authorID;
            comment.content = req.body.content; 
            var newComments = post.comments.concat([comment]);
            post.comments = newComments;
            // save the post
            post.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Post updated!' });
            });

        });
    });








// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);