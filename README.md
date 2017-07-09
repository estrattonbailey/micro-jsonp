# micro-jsonp
Teeny-tiny JSONP handler. **386b gzipped.**

## Usage
```javascript
import jsonp from 'micro-jsonp'

jsonp('path/to/endpoint?data=Data', {
  param: 'callback',
  timeout: 10000,
  response: (err, data) => {
    err ? errorCallback(err) : successCallback(data)
  }
})
```

## API

### jsonp(url[, options])

#### url
The endpoint *and* serialized data e.g. `path/to/endpoint?email=ericstrattonbailey%2B1%40gmail.com`.

#### options
 - `param (optional, type: string, default: 'callback')`: the name of the query param your service uses to specify the callback function `default: 'callback'`
 - `response (required, type: function)`: your data callback function - receives `err, data` params - users must handle success/error state
 - `timeout (optional, type: number, default: 60000)`: an optional timeout. If `false`, script will not time out.

* * *
 MIT License
