const { response } = require("express")
const { request } = require("http")
const { app } = require('../index')

describe('income/add', () => {
    it('should income add successful created', async () => {
        return request(app)
            .post('/income/add')
            //set
            .send({
                incomeMoney: 2000000,
                description: "masuk dari gaji",
                trackerId: 1
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('income activity registered')
            })
    })

})