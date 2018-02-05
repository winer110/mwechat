import xml2js from 'xml2js'
import template from './tpl'
import sha1 from 'sha1'

function parseXML(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml,{ trim: true }, (err, content) => {
      if (err) reject(err)
      else resolve(content)      
    })
  })
}


function formatMessage(result){
  let message = {}

  if (typeof result === 'object') {
    const keys = Object.keys(result)

    for (let i = 0; i < keys.length; i++) {
      // 调换顺序
      let key = keys[i]
      // let item = result[key[i]] keys[i] || key
      let item = result[key]

      if (!(item instanceof Array) || item.length === 0) {
        continue
      }

      if (item.length === 1) {
        let val = item[0]

        if (typeof val === 'object') {
          // 递归
          message[key] = formatMessage(val)
        } else {
          message[key] = (val || '').trim()
        }
      } else {
        message[key] = []

        for (let j = 0; j < item.length; j++) {
          // 递归
          message[key].push(formatMessage(item[j])) 
        }
      }
    }
  }

  return message
}

// 解析内容、回复的消息
function tpl(content, message){
  let type = 'text'

  if (Array.isArray(content)) {
    type = 'news'
  }

  if (!content) {
    content = 'Empty News'
  }

  if (content && content.type) {
    type = content.type
  }

  let info = Object.assign({}, {
    content,
    createTime: new Date().getTime(),
    msgType:type,
    toUserName:message.FromUserName,
    fromUserName:message.ToUserName
  })
  // template -> tpl -> lib|middleware
  return template(info)

}



//------------------------------网页授权--------签名算法-----------
// 1、引导用户进入授权页面同意授权，获取code
// 2、通过code换取网页授权access_token（与基础支持中的access_token不同）
// 3、如果需要，开发者可以刷新网页授权access_token，避免过期
// 4、通过网页授权access_token和openid获取用户基本信息（支持UnionID机制）

function createNonce(){
  return Math.random().toString(36).substr(2, 15)
}
// Math.random().toString(36).substr(2, 15)

function createTimeStamp(){
  return parseInt(new Date().getTime() / 1000, 0) + ''
}
// 排序方法
function raw(args){
  let keys = Object.keys(args)
  keys = keys.sort()

  let newArgs = {}

  keys.forEach(key => {
    newArgs[key.toLowerCase()] = args[key]
  })
  // 拼接url传参
  let str = ''

  for (let k in newArgs) {
    str += '&' + k + '=' + newArgs[k]
  }
  
  return str.substr(1) // 删除最前的空''
}

function signIt(nonce, ticket, timestamp, url){
  const ret = {
    jsapi_ticket:ticket,
    nonceStr:nonce,
    timestamp,
    url
  }
// ['jsapi_ticket','nonceStr', 'timestamp', 'url'].sort()
  const string = raw(ret)
  const sha = sha1(string)

  return sha
}

function signU(ticket, url){
  const nonce = createNonce()
  const timestamp = createTimeStamp()
  // console.log('----------1----------', ticket)
  const signature = signIt(nonce, ticket, timestamp, url)

  return {
    noncestr:nonce,
    timestamp,
    signature
  }
}

export {
  formatMessage,
  parseXML,
  tpl,
  signU
}














