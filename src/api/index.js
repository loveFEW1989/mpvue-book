import {get, post} from '../utils/request'

const API_URL = 'https://test.youbaobao.xyz:18081'
import { APP_ID, APP_SECRET } from '../utils/const'
export function getHomeData(params) {
  return get(`${API_URL}/book/home/v2`,params)
}


export function recommend() {
  return get(`${API_URL}/book/home/recommend/v2`)
}

export function freeRead() {
  return get(`${API_URL}/book/home/freeRead/v2`)
}

export function hotBook() {
  return get(`${API_URL}/book/home/hotBook/v2`)
}
// 获取openid
export function getOpenId(code) {
  return get(`${API_URL}/openId/get`,{
    appId: APP_ID,
    secret: APP_SECRET,
    code
  })
}
// 用户注册
export function register(openId,userInfo) {
  return post(`${API_URL}/user/register`, {
    openId,
    platform: mpvuePlatform,
    ...userInfo
  })
}
export function search(params) {
  return get(`${API_URL}/book/search`,params)
}

export function hotSearch() {
  return get(`${API_URL}/book/hot-search`)
}

export function searchBook(params) {
  if (params.publisher) {
    params.publisher = encodeURIComponent(params.publisher)
  }
  if (params.author) {
    params.author = encodeURIComponent(params.author)
  }
  if (params.category) {
    params.category = encodeURIComponent(params.category)
  }
  if (!params.pageSize) {
    params.pageSize = 20
  }
  if (!params.page) {
    params.page = 1
  }
  return get(`${API_URL}/book/search-list`, params)
}

export function getDetailData(params) {
  return get(`${API_URL}/book/detail`, params)
}
// 评分
export function rank({ openId, fileName, rank }) {
  return get(`${API_URL}/book/rank/save`, { openId, fileName, rank })
}

export function getDetailContents(fileName) {
  return get(`${API_URL}/book/contents`,{fileName})
}
// 书籍是否在书架中
export function getShelf(openId,fileName) {
  const params = {}
  openId&&(params.openId=openId)
  fileName&&(params.fileName=fileName)
  console.log(params)
  return get(`${API_URL}/book/shelf/get`, params)
}
export function saveShelf(shelf) {
  return get(`${API_URL}/book/shelf/save`,{ shelf: encodeURIComponent(JSON.stringify(shelf)) })
}
export function removeShelf(shelf) {
  return get(`${API_URL}/book/shelf/remove`,{ shelf: encodeURIComponent(JSON.stringify(shelf)) })
}
export function categoryList() {
  return get(`${API_URL}/book/category/list/v2`)
}

export function userDay(params) {
  return get(`${API_URL}/user/day`,params)
}


export function day(openId) {
  return get(`${API_URL}/user/day`, { openId })
}

export function hasSignToday(openId) {
  return get(`${API_URL}/user/hasSignToday`, { openId })
}

export function sign(openId) {
  return get(`${API_URL}/user/sign`, { openId })
}