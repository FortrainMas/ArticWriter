const server = require('../router/articles')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.user(chaiHttp)

describe('Aricles APIs', ()=>{
    describe('Test post route of getting a certain article', () => {
        it('Should return articles', done => {
            chai.request(server)
                .get('/adfsasdfa')
        })
    })
})