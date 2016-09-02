import 'babel-register'
import test from 'ava'
import query from 'query-string'
import jsdom from 'jsdom-global'
import jsonp from '../'

jsdom('<html></html>')

const endpoint = 'http://jsfiddle.net/echo/jsonp/'

test.cb('default config', t => {
  t.plan(1)

  const d = {
    email: 'email@gmail.com',
    first: 'Washington',
    last: 'Irving' 
  }

  jsonp(`${endpoint}?${query.stringify(d)}`, {
    response: (err, data) => {
      if (err) throw err
      t.deepEqual(data, d)
      t.end()
    }
  }) 
})

test.cb('timeout', t => {
  t.plan(1)

  const d = {
    delay: 5
  }

  jsonp(`${endpoint}?${query.stringify(d)}`, {
    timeout: 3000,
    response: (err, data) => {
      if (err){
        t.pass() 
        t.end()
      }
    }
  }) 
})
