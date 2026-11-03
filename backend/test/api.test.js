import test from 'node:test'
import assert from 'node:assert/strict'
import { app } from '../src/app.js'
import http from 'node:http'

test('health endpoint reports API status', async () => {
  const server = http.createServer(app)
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    const response = await fetch(`http://127.0.0.1:${address.port}/api/health`)
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { status: 'ok', service: 'medicart-api' })
  } finally { await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())) }
})

test('products endpoint returns demo catalogue when no database is configured', async () => {
  const server = http.createServer(app)
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    const response = await fetch(`http://127.0.0.1:${address.port}/api/products`)
    const body = await response.json()
    assert.equal(response.status, 200)
    assert.equal(body.source, 'demo')
    assert.ok(body.items.length >= 1)
  } finally { await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())) }
})
