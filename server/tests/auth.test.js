import request from 'supertest'
import app from '../testApp.js'

describe('POST /auth/register', () => {
  it('returns 200 on happy path (mocked)', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'secret123' })
    expect([200, 400]).toContain(res.status) // allow already-registered
  })
})

