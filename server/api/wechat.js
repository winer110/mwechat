// 微信相关 api 调用    类似 actions
// import { getWechat } from '../wechat'

// 少传getOAuth
import { getWechat, getOAuth } from '../wechat'

const client = getWechat()

// 多了default
// export default async function getSigntureAsync(url) {
export async function getSigntureAsync(url) {
  const data = await client.fetchAccessToken()
  const token = data.access_token
  const ticketData = await client.fetchTicket(token) // less token
  const ticket = ticketData.ticket

  // let params = client.sign(token, ticket)
  // params.appId = params.appID 
  let params = client.sign(ticket, url)
  params.appId = client.appID 
  
  return params
}

export async function getAuthorizeURL(...args){
  const oauth = getOAuth()

  return oauth.getAuthorizeURL(...args)  

}


export async function getUserByCode(code){
  // 拿到OAuth实例
  const oauth = getOAuth()
  const data = await oauth.fetchAccessToken(code)
  const user = await oauth.getUserInfo(data.access_token, data.openid)
  console.log('---------api---wechat--------')
  console.log(user)
  return user  

}