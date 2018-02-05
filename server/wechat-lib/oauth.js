// 网页授权 二跳
import rp from 'request-promise'

const base = 'https://api.weixin.qq.com/sns/'
const api = {
  // 手动同意授权的地址
  authorize: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
  accessToken: base + 'oauth2/access_token?',
  userInfo: base + 'userinfo?',

}

export default class WechatOAuth{
  constructor(opts){
    this.appID = opts.appID
    this.appSecret = opts.appSecret
  }

  async request(options){    
    options = Object.assign({}, options, { json: true })

    try {
      const response = await rp(options)
      console.log('wechat-lib oauth-----', response)
      return response
    } catch (err){
      console.error(err)
    }    
  }
  async fetchAccessToken(code){
    const url = `${api.accessToken}appid=${this.appID}&secret=${this.appSecret}&code=${code}&grant_type=authorization_code`
    // const data = await this.request(url)  {}
    const data = await this.request({url})

    return data // openid code
  }
  // 二跳地址、获取code             个性化参数
  getAuthorizeURL(scope = 'snsapi_base', target, state){    
    // const url = `${api.authorize}appid=${this.appID}&redirect_uri=${encodeURIComponent(target)}$response_type=${scope}&state=${state}#wechat_redirect`
    const url = `${api.authorize}appid=${this.appID}&redirect_uri=${encodeURIComponent(target)}$response_type=code&scope=${scope}&state=${state}#wechat_redirect`

    return url
  }

  // 获取用户信息
  async getUserInfo(token, openID, lang='zh_CN'){
    const url = `${api.userInfo}access_token=${token}&openid=${openID}&lang=${lang}`
    const data = await this.request({url})

    return data
  }


}










