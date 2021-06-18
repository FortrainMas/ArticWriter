const images = require('./router/images.js')
const articles = require('./router/articles')
const users = require('./router/users')

const express = require('express')
const cors = require('cors')

var bodyParser = require('body-parser')
const fileupload = require("express-fileupload");


const app = express()
app.use(cors())
app.use(fileupload()); 

app.use(bodyParser.json())

//Send image that was requested
app.use('/img', images)

//Send all articles from server
app.use('/articles', articles)

//Provide functionality with users
app.use('/users', users)


app.listen(2000, ()=>{console.log("I'm alive")})