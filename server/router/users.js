const express = require('express')
const router = express.Router()

//Is using to encrypt the password
const {sha256} = require('crypto-hash');


//User db provider functionality
const {createUser, getUserDataById, getUsers, confirmUser, updateUser} = require('../db_workers/user_db_provider');

//Send list with public users' information from server
router.post('/', async (req, res)=>{
    let limit = 100, skip = 0
    limit = req.body.limit
    skip=req.body.skip

    getUsers(limit, skip)
        .then(users=>{
            res.status(200).json({"status": "success", "error": null, users})
        })
        .catch(err=>{
            console.warn(err)
            res.status(500).json({"status": "failed", "error": "Server error"})
        })
})

//Send specified user by id
router.get('/:id', async (req, res)=>{
    const userId = req.params.id

    getUserDataById(userId)
        .then(user=>{
            user?res.status(200).json({"status": "success", "error": null, user}):
            res.status(400).json({"status": "failed", "error": "Nonexistent ID"})
        })
        .catch(err=>{
            res.status(500).json({"status": "failed", "error": err.message})
        })

})

//Create user in the db
router.post('/create', async (req, res)=>{

    const user = req.body
    
    //Validate user
    if(!user.name || !user.surname || !user.login || !user.password){
        res.status(400).json({"status":"failed", error: "User isn't valid"})
        return
    }

    //Sets the user default to default photo and hashes password
    user.photo = 'user.png'
    user.password = await sha256(user.password)


    //Save user in the db. In case something is wrong, send error message
    createUser(user.name, user.surname, user.photo, user.login, user.password)
        .then(user=>{
            console.log(`User ${user._id} was saved`)
            res.status(200).json({"status": "success", "error": null})
        })
        .catch(err=>{
            res.status(500).json({"status": "failed", "error": err.message})
        })    
    
})

//Get login and password. Then hash password and trying to find person with this data in db
//If find, sends user, in other case, send error
router.post('/confirm', async (req, res) => {
    let {login, password} = req.body

    if(!login || !password){
        res.status(400).json({"status": "failed", "error": "No login or password"})
    }

    password = await sha256(password)

    confirmUser(login, password)
        .then(result=>{
            res.status(200).json({"status": "success", "error": null, "response": result})
        })
        .catch(err=>{
            res.status(400).json({"status": "failed", "error": err.message})
        })

})


//Update user with transmitted login and password
//UpdatedUser doesn't have to be a full user, but it have to include some updated fields
router.post('/update', async (req, res) => {
    let {login, password, updatedUser} = req.body


    console.log(login)
    console.log(password)
    console.log(updatedUser)

    if(login == undefined || password == undefined || updatedUser == undefined){
        res.status(400).json({"status": "failed", "error": "invalid request"})
        return
    }

    password = await sha256(password)


    updateUser(login, password, updatedUser)
        .then(result => {
            res.status(200).json({"status": "success", "error": null, "user": result})
        })
        .catch(err => {
            res.status(400).json({"status": "failed","error": err.message})
        })

})

module.exports = router