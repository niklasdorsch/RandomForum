// app/models/bear.js

var mongoose     = require('mongoose');
var timestamps   = require('mongoose-timestamp');
var Comment      = require('./comment');
var Schema       = mongoose.Schema;



var PostSchema   = new Schema({
	authorID  : String,
    author  : String,
    content : String,
    comments: [Comment.schema]
},
{ toObject: { virtuals: true },
  toJSON  : { virtuals: true } }
);

PostSchema.plugin(timestamps);
PostSchema.virtual('canUpdate').get(function() { 
	var date = new Date(); 
    return date-this.createdAt < 60000;
});

module.exports = mongoose.model('Post', PostSchema);