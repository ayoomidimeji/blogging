const mongoose = require('mongoose')

//create Posts schema
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    postCover: {type: String, default: "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"},
    postDate: {type: Date, default: Date.now},
    likes: {type: Number, default: 0},
    tags: [String],
    category: String,
}, { timestamps: true })

//constructing the model using the .model method
const Post = mongoose.model('Post', postSchema)

//exporting the model
module.exports = Post;