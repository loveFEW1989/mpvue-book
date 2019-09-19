import {getOpenId} from './index'
export function getSetting(auth, onSuccess, onFail) {
  mpvue.getSetting({
    success(res) {
      console.log(res)
      if(res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      // 抛出异常
      console.log(res)
    }
  })
}

export function getUserInfo(onSuccess,onFail) {
  mpvue.getUserInfo({
    success(res) {
      console.log(res)
      let {userInfo} = res
      if(userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      // 抛出异常
      consolelog(res)
    }  
  })
}

export function setStorageSync(key,data) {
  mpvue.setStorageSync(key,data)
}
export function getStorageSync(key) {
  mpvue.getStorageSync(key)
}

export function getUserOpenId(callback) {
  mpvue.login({
    success(res) {
      if(res.code) {
        const {code } = res
        getOpenId(code).then(res=> {
          const {data: {data:{openid}}} = res
          setStorageSync('openId',openid)
          callback&&callback(openid)
        }).catch(err=>{
          console.log(err)
        })
      } else {
        console.log(res)
      }
    },
    fail(res) {
      console.log(res)
    }
  })
}

export function showLoading(title) {
  mpvue.showLoading({
    title,
    mask: true
  })
}

export function hideLoading() {
  mpvue.hideLoading()
}

export function showToast(title) {
  mpvue.showToast({
    title,
    duration:2000
  })
}

export function setNavigationBarTitle(title) {
  mpvue.setNavigationBarTitle(title)
}