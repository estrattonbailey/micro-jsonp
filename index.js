let count = 0

/**
 * Options:
 *  - param {String} query parameter + callback name
 *  - timeout {Number} how long to wait for a response 
 *
 * @param {String} url
 * @param {Object} options
 */
export default (url, opts = {}) => {
  const cb = `__c${count++}`
  const param = opts.param || 'callback' 
  const query = `${param}=${cb}`
  const timeout = opts.timeout || 60000
  const response = opts.response ? opts.response : (err, data) => console.log(err, data)
  const script = document.createElement('script')

  const cancel = () => window[cb] ? cleanup() : null

  const timer = timeout ? setTimeout(function(){
    cleanup()
    response(new Error('Timeout'))
  }, timeout) : null

  const cleanup = () => {
    document.head.removeChild(script);
    window[cb] = () => {} 
    if (timer) clearTimeout(timer)
  }

  window[cb] = data => {
    response(null, data)
    cleanup()
  }

  script.src = `${url}&${query}`
  document.head.appendChild(script)

  return cancel
}
