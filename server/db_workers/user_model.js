const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    photo: String,
    login: String,
    password: String,
    articles: [String]
})

const User = mongoose.model('User', userSchema)

module.exports = User