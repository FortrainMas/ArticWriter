const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')



//Send list with all public users' information from server
router.get('/', async (req, res)=>{
    await fs.readFile(`./assets/users.json`, (err, data) => {
        res.json(JSON.parse(data))
    })
})

//Send specified user by id
router.get('/:id', async (req, res)=>{
    const userId = req.params.id
    await fs.readFile(`./assets/users.json`, (err, data) => {
        
        const users = JSON.parse(data)
        
        if(!users){
            res.status(500).send("Something went wrong. We didn't find any users")
            return
        }

        let isUserSent = false
        users.forEach(user => {
            if(user.id == userId){
                res.json(user)
                isUserSent = true
            }
        });

        if(!isUserSent){
            res.status(404).send(`User with id ${userId} doesn't exist`)
        }
    })
})

module.exports = router