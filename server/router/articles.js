const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')




//Send list with all articles from server
router.get('/', async (req, res)=>{
    await fs.readFile(`./assets/articles.json`, (err, data) => {
        res.json(JSON.parse(data))
    })
})


//Send specified article by id
router.get('/:id', async (req, res)=>{
    const articleId = req.params.id
    await fs.readFile(`./assets/articles.json`, (err, data) => {
        
        const articles = JSON.parse(data)
        
        if(!articles){
            res.status(500).send("Something went wrong")
            return
        }

        let isArticleSent = false
        articles.forEach(article => {
            if(article.id == articleId && !isArticleSent){
                res.json(article)
                isArticleSent = true
            }
        });

        if(!isArticleSent){
            res.status(404).send(`Article with id ${articleId} doesn't exist`)
        }
    })
})

module.exports = router