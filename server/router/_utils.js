const {sha256} = require('crypto-hash');
const fs = require('fs')

//Return false, if user's either login or passwor data is invalid
//In the other case, return user's data
async function authUser(login, password){

    if(login == undefined || password == undefined){
        return false
    }

    password = await sha256(password)
    let response = false

    const users = JSON.parse(fs.readFileSync(`./assets/users.json`))
    users.forEach(user => {
        if(user.login == login && user.password == password){
            response = user
        }
    })
    return response
}

module.exports={authUser}