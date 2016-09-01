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
