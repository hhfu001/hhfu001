const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    url: String,
    title: String,
    imgs: [String],
    author: String,
    author_url: String,
    author_location: String,
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
});

PostSchema.index({
    create_at: -1
});


PostSchema.statics = {
	
    findAll: function(cb) {

        return this.find({}).sort({
            create_at: -1
        }).limit(100).exec(cb);

    },

    findByLocation: function(location, cb) {

        return this.find({
            author_location: location
        }).sort({
            create_at: -1
        }).limit(100).exec(cb);

    },

    findByAuthor: function(author, cb){

    	return this.find({
            author_url: author
        }).sort({
            create_at: -1
        }).limit(100).exec(cb);

    },

    findByUrl: function(url, cb){
        return this.find({
            url: url
        }).exec(cb);

    }

}


module.exports = PostSchema;