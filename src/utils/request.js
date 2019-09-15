

function createFly() {
  if(mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}

export function get(url, params = {}) {
  const fly  = createFly()
  if(fly) {
    return new Promise((resolve,reject) => {
      fly.get(url,params).then(res=> {
        console.log(res)
        resolve(res)
      }).catch(err=> {
        console.log(err)
        reject(err)
      })
    })
  }
}

export function post(url,params={}) {
  const fly = createFly()
  if(fly) {
    return new Promise((resolve,reject) => {
      fly.post(url,params).then((res) => {
        console.log(res)
        resolve(res)
      }).catch(err=> {
        console.log(err)
        reject(err)
      })
    })
  }

}