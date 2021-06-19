const { ESRCH } = require('constants')
const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

const {authUser} = require('./_utils')


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

router.post('/create', async (req,res) => {
    const {title, content, photo, login, password} = req.body
    
    const author = await authUser(login, password)

    if(!author){
        res.status(400).json({error: 'Invalid user data'})
        return
    }

    const article = {
        id: `${title}_${(new Date()).getTime()}`,
        AuthorId: author.id,
        Rand: 0,
        Title,
        Content
    }

    const articles = JSON.parse(fs.readFileSync(`./assets/articles.json`, 'utf-8', ()=>{}))
    articles.push(article)
    fs.writeFile('./assets/articles.json', JSON.stringify(articles), (err) => {
        if(err){
            res.status(500).json({error: 'Server side error'})
        }
    })
    res.status(200).json({error: null}      )
})

module.exports = router