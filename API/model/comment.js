
var mongoose     = require('mongoose');
var timestamps   = require('mongoose-timestamp');
var Schema       = mongoose.Schema;

var CommentSchema = new Schema({
	authorID  : String,
    author    : String,
    content   : String
},
{ toObject: { virtuals: true },
  toJSON  : { virtuals: true } }
);

CommentSchema.plugin(timestamps);
CommentSchema.virtual('canUpdate').get(function() { 
	var date = new Date(); 
    return date-this.createdAt < 60000;
});

module.exports = mongoose.model('Comment', CommentSchema);