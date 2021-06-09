const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')



//Send image. 
//Image name have to be in query. Just like /img?img=yourImageName.jpg
router.get('/', async (req, res)=>{

    //If cant find image on the server, then send cat image
    await fs.readFile(`./assets/${req.query.img}`, (err, img) => {
        if(err) {
            res.sendFile(path.resolve(`${__dirname}/../assets/errorCat.jpg`));
        }
        else{
            res.sendFile(path.resolve(`${__dirname}/../assets/${req.query.img}`))
        }
    })
})

module.exports = router