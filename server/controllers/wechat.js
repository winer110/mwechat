// 微信业务相关的控制逻辑   有点类似 mutations,修改ctx的值给前端
import config from '../config'
import * as api from '../api'

import { parse as urlParse } from 'url'
import { parse as queryParse } from 'querystring'

export async function signature(ctx, next){
  let url = ctx.query.url

  if (!url) ctx.throw(404)

  url = decodeURIComponent(url)

  const params = await api.getSigntureAsync(url)
  
  ctx.body = {
    success: true,
    params
  }
}

// 网页上点某按钮，直接跳转到 http://x.o/wechat-redirect?visit=a&id=b
// 用户被重定向到 Wechat Redirect URL 授权验证
// 验证后，自动二跳进入 http://x.o/oauth?code=xxxxxx&state=a_b
export async function redirect(ctx, next){
  // console.log(api)

  const target = config.SITE_ROOT_URL + '/oauth'
  const scope = 'snsapi_userinfo'
  console.log(ctx.query)
  const { a, b } = ctx.query
  const params = `${a}_${b}`
  const url = api.getAuthorizeURL(scope, target, params)

  ctx.redirect(url)

}

export async function oauth(ctx, next){
  let url = ctx.query.url

  url = decodeURIComponent(url)
// 解析url
  const urlObj = urlParse(url)
  // const params = querystring(urlObj.queryParse)
// 解析query  
  const params = queryParse(urlObj.query)
  const code = params.code
  const user = await api.getUserByCode(code)

  console.log(user)
  // 挂载到session
  ctx.session = {
    openid: user.openid
  }

  ctx.body = {
    success:true,
    // user
    data:user
  }

}

