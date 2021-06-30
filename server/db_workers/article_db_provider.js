////Mongo model of the article
const Article = require('./article_module')

//Return promise of mongoose_model.find() function, but with limit and skip
async function getArticles(limit = 100, skip = 0){
    console.log(`limit: ${limit}; skip: ${skip}`)
    return Article.find().sort({ _id: -1 }).limit(limit).skip(skip).exec()
}

//Resolves with article object or none(in case id is incorrect)
//Reject in case of some error
async function getArticleById(id){
    return new Promise((resolve, reject)=>{
        Article.findOne({_id: id}, (err, article) => {
            if(err) { reject(err); return }
            resolve(article)
        })
    })
}

//Just creates article by the requested data
//IMPORTANT: if you use this function, you have to be sure, that the authorId is confirmed by his password and login
async function createArticle(title, content, photo, authorId, rang){

    const article = new Article({title, content, photo, authorId, rang})

    return promise = new Promise((resolve, reject)=>{
        article.save((err, article)=>
        {
            if (err){ reject(err); return}
            resolve(article)
        })
    })

}

//Update article by id and new update data.
//In the all case except article was successfuly UPDATED, calls reject
//IMPORTANT: if you use this function, you have to be sure, that the author of deletion request is the author of the article
async function updateArticle(id, updatedData){
    return promise = new Promise((resolve, reject)=>{
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            reject( new Error('Incorrect Id') )
            return
        }
        Article.updateOne({_id: id}, updatedData)
            .then(async (result)=>{
                console.log(result)
                if (result.n == 0){
                    reject( new Error('Not found'))
                }else if (result.nModified == 0){
                    reject( new Error('Incorrect update data'))
                }else{
                    Article.findOne({_id: id}, (err, article) => {
                        resolve(article)
                    })
                }
            })
            .catch(err=>{
                reject(err)
            })
    })
}


//Delete article by id
//IMPORTANT: if you use this function, you have to be sure, that the author of deletion request is author or admin
async function deleteArticle(id){
    return Article.deleteOne({_id: id}).exec()
}

module.exports = {getArticles, getArticleById, createArticle, updateArticle, deleteArticle}