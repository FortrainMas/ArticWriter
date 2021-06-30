const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    photo: String,
    authorId: String,
    rang: Number
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article