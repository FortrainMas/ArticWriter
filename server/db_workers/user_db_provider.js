//Mongo model of the user
const c = require('config');
const User = require('./user_model')

//Sends list of all users
async function getUsers(limit = 100, skip = 0){
    return User.find().limit(limit).skip(skip).exec()
}

//Return by users id 
async function getUserDataById(id){
    const promise = new Promise((resolve, reject)=>{
        User.findOne({_id: id}, (err, user) => {
            if(err) { reject(err); return }
            resolve(user)
        })
    })

    return promise
}


//Creates user by his data. Returns promise
async function createUser(name, surname, photo, login, password){
    const user = new User({name, surname, photo, login, password, articles:[]})

    const promise = new Promise((resolve, reject)=>{
        user.save((err, user)=>{
            if (err){ reject(err); return}
            resolve(user)
        })
    })

    return promise
}

//Confirm user by login and password. If user exist return true, in the other case false. 
//Also can return error in strange cases (maybe just like there isn't either password or login)
async function confirmUser(login, password){
    const promise = new Promise((resolve, reject)=>{
        User.findOne({login, password}).exec()
        .then(res => { 
            if(!!res == true) {
                resolve(res)
            }else{
                reject(new Error('Authentification failed'))
            }})
        .catch(err => { if(err) reject(err) })
    })
    return promise 
}

//Just like "confirmUser", but return user object, in case user is found, or return null
async function confirmaAndGetUser(login, password){
    let result
    await User.findOne({login, password}).exec()
        .then(res => { result = res })
        .catch(err => { if(err) result = err })
    return result 
}

//Update user data by login and password, return promise
//Resolve, if user was successfuly updated
//In the over cases and also in case, that everything is correct, but data is new, calls reject 
async function updateUser(login, password, updatedData){
    const promise = new Promise((resolve, reject)=>{
        User.updateOne({login, password}, updatedData)
            .then(async (result)=>{
                if (result.n == 0){
                    reject( new Error('Authentification failed'))
                }else if (result.nModified == 0){
                    reject( new Error('Incorrect update data'))
                }else{
                    const updatedUser = await confirmaAndGetUser(login, password)
                    resolve(updatedUser)
                }
            })
            .catch(err=>{
                reject(err)
            })
    })
    return promise
}

//Add article to users articles
async function addArtcile(userId, aritcleId){
    User.updateOne({_id: userId}, {$push: {articles: aritcleId}}, ()=>{})
}


module.exports = {createUser, getUserDataById, getUsers, confirmUser, updateUser, addArtcile}