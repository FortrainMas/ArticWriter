const config = require('config')
const mongoose = require('mongoose');

function createConncetion(){
    const connectionString = config.get('mongoConnectionString')
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}), ()=>{console.log('connected')};

    const db = mongoose.connection
    db.on('error', () => console.error('Connection error'));
    db.once('open', ()=>{
        console.log('Database successfuly connected')
    })

    return db
}

module.exports = {createConncetion}