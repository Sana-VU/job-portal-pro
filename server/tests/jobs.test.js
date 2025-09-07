import request from 'supertest'
import app from '../testApp.js'

describe('GET /jobs', () => {
  it('returns an object with items array', async () => {
    const res = await request(app).get('/jobs')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('items')
    expect(Array.isArray(res.body.items)).toBe(true)
  })
})

