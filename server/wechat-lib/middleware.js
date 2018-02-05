/*
  获取token，完成跟微信服务器的验证
  解析post数据
  回复内容封装成 xml
  
  middleware router调用
*/ 
import sha1 from 'sha1'
import getRawBody from 'raw-body'
// import config from '../config'
import * as util from './util'


export default function(opts, reply){
  // 验证微信服务器的token校验
  return async function wechatMiddle (ctx, next) {
      // test
      // require('../wechat') 

      // let token = config.wechat.token
      let token = opts.token
      // 该请求只能由微信服务器请求，不然不会传递参数，配置不成功
      // 拿到所有参数、排序加密
      const {
        signature,
        nonce,
        timestamp,
        echostr
      } = ctx.query

      const str = [token,timestamp,nonce].sort().join('')
      const sha = sha1(str)
      
      // console.log('sha === signature  ', sha === signature)   // 6717093670814477183

      if (ctx.method === 'GET') {
        if (sha === signature) {
          // console.log('-lib-middle--wechat--server--token--Success---------', ctx.query)   // 12241506874909786038
          ctx.body = echostr
        } else {
          ctx.body = '<h1>-----signature校验Failed---------</h1>'
        }
      } else if (ctx.method === 'POST') {
        // 数据解析
        if (sha !== signature) {
          ctx.body = '-POST----Failed'

          return false
        }
        // 拿到数据包
        const data = await getRawBody(ctx.req, {
          length: ctx.length,
          limit: '1mb',
          encoding: ctx.charset
        })

        const content = await util.parseXML(data)
        // console.log('wechat-lib middleware---------', content)
        // {
        //   xml: {
        //     ToUserName: ['gh_9cc8d7801147'],
        //     FromUserName: ['oQpKi07GwbjmQFov7UJfPyidAQd4'],
        //     CreateTime: ['1516204068'],
        //     MsgType: ['text'],
        //     Content: ['？'],
        //     MsgId: ['6512046886538425431']
        //   }
        // }
        // {
        //   xml: {
        //     ToUserName: ['gh_9cc8d7801147'],
        //     FromUserName: ['oQpKi07GwbjmQFov7UJfPyidAQd4'],
        //     CreateTime: ['1516158269'],
        //     MsgType: ['event'],
        //     Event: ['LOCATION'],
        //     Latitude: ['39.072102'],
        //     Longitude: ['117.087273'],
        //     Precision: ['380.000000']
        //   }
        // }

        const message = util.formatMessage(content.xml)
        // 挂载到weixin字段中
        // 通过视频的测试方法，发现是俩 {}
        ctx.weixin = message
        // console.log(message)
        // console.log(ctx.weixin)

        await reply.apply(ctx, [ctx, next])

        const replyBody = ctx.body
        const msg = ctx.weixin
        // template -> tpl -> lib|middleware
        // 构建xml
        const xml = util.tpl(replyBody, msg)
        // console.log('wechat-lib-middleware-reply')
        // console.log(xml)
        // <xml>
        //   <ToUserName><![CDATA[]]></ToUserName>
        //   <FromUserName><![CDATA[]]></FromUserName>
        //   <CreateTime>1516204074083</CreateTime>
        //   <MsgType><![CDATA[text]]></MsgType>
        //     <Content><![CDATA[Empty News]]></Content>
        // </xml>

        // 回复的具体内容
        ctx.status = 200
        ctx.type = 'application/xml'
        ctx.body = xml

      }
    }
}

