//Routes import
const images = require('./router/images.js')
const articles = require('./router/articles')
const users = require('./router/users')

//Express and express third-parts
const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const fileupload = require("express-fileupload");

const app = express()
app.use(cors())
app.use(fileupload()); 
app.use(bodyParser.json())

//Connect database
const dbProvider = require('./db_workers/_db_provider')
const dbInstance = dbProvider.createConncetion()

//Routes
app.use('/img', images)
app.use('/articles', articles)
app.use('/users', users)


app.listen(2000, ()=>{console.log("I'm alive")})