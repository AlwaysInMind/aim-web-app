// A basic promisify for functions with node style callbacks ie (err, value)
// only the 1st arg in the callback (after err) is handled
function promisify(original) {
  function fn(...args) {
    const promise = new Promise((resolve, reject) => {
      try {
        original.call(this, ...args, (err, ...values) => {
          if (err) {
            reject(err)
          } else {
            resolve(values[0])
          }
        })
      } catch (err) {
        reject(err)
      }
    })
    return promise
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original))
  return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original))
}

module.exports = promisify
