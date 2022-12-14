

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


describe('/income/add', () => {
    it('should income add successful created', async () => {
        return request(app)
            .post('/income/add')
            .set('Authorization', 'Bearer ' + token)
            .send({
                incomeMoney: 2000000,
                description: "masuk dari gaji",


            })
            .expect('Content-Type', /json/)
            .then((response) => {
                // expect(response.status).toBe(200)
                expect(response.body.message).toBe('income activity registered')
            })
    })

})