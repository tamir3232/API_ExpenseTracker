const request = require('supertest')
const { app } = require('../index')

describe('auth', () => {
    it('Should be 200 if username and password right', async () => {
        return request(app)
            .post('/auth/login')
            .send({
                email: 'tamir@gmail.com',
                password: 'tamir123',
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('anda berhasil login')

            })
    })
})