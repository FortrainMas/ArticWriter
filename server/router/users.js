const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')


const {sha256} = require('crypto-hash');

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

router.post('/create', async (req, res)=>{
    console.log(req.body)
    const user = req.body
    if(!user.name || !user.surname || !user.login || !user.password){
        res.status(400).json({error: "User isn't valid"})
    }else{
        const  today = new Date();
        const  d = today.getDate();
        const  h = today.getHours();
        const  s = today.getSeconds();
        const  m = today.getMilliseconds();
        const id = `${d}${h}${s}${m}${user.login}`
        user.id = id
        user.photo = 'user.jpg'
        user.password = await sha256(user.password)

        const users = JSON.parse(fs.readFileSync(`./assets/users.json`))
        users.push(user)
        fs.writeFile('./assets/users.json', JSON.stringify(users), ()=>{})

        res.send('Success')
    }
})

//Get login and password. Then hash password and trying to find person with this data in users.json.
//If find sends user, in other way - false.
router.post('/check', async (req, res) => {
    let {login, password} = req.body
    password = await sha256(password)
    let flag = false

    const users = JSON.parse(fs.readFileSync(`./assets/users.json`))
    users.forEach(user => {
        if(user.login == login && user.password == password){
            flag = user
        }
    });

    res.send(flag)
})

module.exports = router