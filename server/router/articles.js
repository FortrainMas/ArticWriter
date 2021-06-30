const { ESRCH } = require('constants')
const express = require('express')
const router = express.Router()

//Is using to encrypt the password
const {sha256} = require('crypto-hash');

const fs = require('fs')
const path = require('path')
const config = require('config');

const {authUser} = require('./_utils')


const {getArticles, getArticleById, createArticle, updateArticle, deleteArticle} = require('../db_workers/article_db_provider')

const {confirmUser, addArtcile} = require('../db_workers/user_db_provider')

//Send list with all articles from server
router.post('/', async (req, res)=>{
    const {limit, skip} = req.body


    console.log(`limit: ${limit}; skip: ${skip}`)

    getArticles(limit, skip)
        .then(articles=>{
            res.status(200).json({'status':'success', 'error': null, articles})
        })
        .catch(err=>{
            console.warn(err)
            res.status(500).json({'status':'failed', 'error': err})
        })
})


//Send specified article by id
router.get('/:id', async (req, res)=>{
    const articleId = req.params.id

    getArticleById(articleId)
        .then(article => {
            article?res.status(200).json({'status':'success', 'error': null, article}):
            res.status(400).json({'status': 'failed', 'error': 'Nonexistent article'})
        })
        .catch(err=>{
            res.status(500).json({'status': 'failed', 'error': err.message})
        })

})

router.post('/create', async (req,res) => {
    const {title, content, photo, login, password} = req.body
    
    //Loads author or in case data is incorrect send error. And "returns" the function
    const author = await confirmUser(login, await sha256(password))
        .catch((err)=>{
            res.status(400).json({'status':'failed', 'error': err})
        })
    if(author === undefined) { return }

    //Validate title and content
    if(!title || !content){
        res.status(400).json({'status':'failed', 'error':'There is no content or title'})
        return
    }

    createArticle(title, content, photo, author._id, 0)
        .then(article=>{
            //Adds an article to the creator's account
            addArtcile(author.id, article.id)
            //Sends a response 
            res.status(200).json({'status':'success', 'error': null, article})
        })
        .catch(err=>{
            res.status(400).json({'status':'failed', 'error': err})
        })
})

router.post('/update', async (req, res) => {
    const {articleId, login, password, update} = req.body

    //Loads author or in case data is incorrect send error. And "returns" the function
    const author = await confirmUser(login, await sha256(password))
        .catch((err)=>{
            res.status(400).json({'status':'failed', 'error': err})
        })
    if(author === undefined) { return }

    //Make response by the update article function. 
    //So return 200 just in case there is an article with _id == articleId and this article was updated
    updateArticle(articleId, update)
        .then(article => {
            res.status(200).json({'status':'success', 'error': null, article})
        })
        .catch(err=>{
            res.status(400).json({'status':'failed', 'error': err.message})
        })
})

router.post('/delete', async (req, res)=>{
    const {secretKey, id} = req.body
    const secretDeletionKey = config.get('secretDeletionKey')
    if(secretKey != secretDeletionKey){
        res.status(400).json({'error': 'incorrect deletion key'})
        return
    }
    res.status(200).json({error: null})
})

module.exports = router