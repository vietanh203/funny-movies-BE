var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Movie = new Schema({
    url:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    like:{
        type:Number
    },
    dislike:{
        type:Number
    },
    shared_by:{
        type:String
    }
});
module.exports = mongoose.model('Movie', Movie);
