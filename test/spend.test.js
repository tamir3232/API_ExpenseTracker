

const request = require('supertest')
const { app } = require('../index')
const jwt = require('jsonwebtoken');

var token = null

beforeAll(async () => {
    return request(app)
        .post('/auth/login')
        .set('Authorization', 'Bearer ' + token)
        .send({
            email: 'tamir@gmail.com',
            password: 'tamir123'
        })
        .expect('Content-Type', /json/)
        .then((response) => {
            token = response.body.data.token;

        })
})


describe('/spending/add', () => {
    it('should spendng add successful created', async () => {
        return request(app)
            .post('/spending/add')
            .set('Authorization', 'Bearer ' + token)
            .send({
                spendingMoney: 2000000,
                description: "makan makan",


            })
            .expect('Content-Type', /json/)
            .then((response) => {
                // expect(response.status).toBe(200)
                expect(response.body.message).toBe('spend activity registered')
            })
    })

})