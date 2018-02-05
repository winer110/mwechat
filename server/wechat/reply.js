/*
  无回复的bug
  
*/

import config from '../config'

const tip = '我的卡丽熙，欢迎来到河间地\n' + 
  '<a href="http://coding.imooc.com">搞事情</a>\n' + 
  '点击 <a href="' + config.SITE_ROOT_URL + '">查身份</a>'

export default async (ctx, next) => {
  // lib middle 中 content.xml 解析后到数据 5671
  let mp = require('./index')
  let client = mp.getWechat()

  const message = ctx.weixin
  console.log('---wechat > reply---ctx.weixin------') // {}
  console.log(message)
  // {
  //   ToUserName: 'gh_9cc8d7801147',
  //   FromUserName: 'oQpKi07GwbjmQFov7UJfPyidAQd4',
  //   CreateTime: '1516207137',
  //   MsgType: 'text',
  //   Content: '哈哈',
  //   MsgId: '6512060067793057303'
  // }

  // 事件类型
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      ctx.body = tip
    } else if(message.Event === 'unsubscrible'){
      console.log('取关了')
    } else if(message.Event === 'LOCATION'){
      ctx.body = `我知道你在哪${message.Latitude}:${message.Longitude},每隔5s看看`
    } else if(message.Event === 'view'){
      ctx.body = message.EventKey + message.MenuId
    } else if(message.Event === 'pic_sysphoto'){
      ctx.body = message.Count + ' phptos send'
    }
  // 消息类型
  } else if (message.MsgType === 'text') {
    // ctx.body = message.Content //tip
    if (message.Content === '1') {
      ctx.body = '痛苦是保持清醒最好的方式'
    } else if (message.Content === '2') {
      ctx.body = '想要成为强者，就不要回避心里的恐惧'
    } else if (message.Content === '3') {
      ctx.body = '有些梦想虽然遥不可及，但不是不可能实现'
    } else if (message.Content === '更新按钮') {
      // let wechatMenu = require('../wechat/menu')
      // // 第三方API模块   // 创建菜单
      // let wechatAPI = require('wechat-api');
      // let api = new wechatAPI(config.wechat.appID, config.wechat.appSecret);
      // api.createMenu(wechatMenu.menu, (err, result) => {
      //   console.log('menu--------kong17-------',result)
      //   if (err) {
      //     ctx.body = err
      //     console.log('menu Failed',err)
      //   } else {
      //     ctx.body = '微信菜单创建成功:' + result
      //     console.log('menu Success')
      //   }
      // })
      let menuMsg = 'create Success'
      const menu = require('./menu')
// ------------// 俩 try catch 执行后，menuMsg居然是 undefined
      try {
        await client.handle('delMenu')
      } catch(e){
        console.log('菜单删除失败, ', e)
        menuMsg = '菜单[删除]失败'
      }      

      try {
        await client.handle('createMenu', menu)
      } catch(e){
        console.log('菜单创建失败, ', e)
        // menuMsg = '菜单[创建]失败'
        menuMsg += menuMsg
      }

      ctx.body = menuMsg
      // console.log(client.handle)
      console.log(ctx.body)
    }
  } else if (message.MsgType === 'image') {
    // {
    //   ToUserName: 'gh_9cc8d7801147',
    //   FromUserName: 'oQpKi07GwbjmQFov7UJfPyidAQd4',
    //   CreateTime: '1516207546',
    //   MsgType: 'image',
    //   PicUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibzP0uGToXUib2S3zD5wZb9QTbttic8myTJCw5mXYicGjyrUfZPZVpjqTibicWbicZibp1ZEGtW2iamibWUb5cAjVZmWelxw/0',
    //   MsgId: '6512061824434681464',
    //   MediaId: 'xJ-i3_vpCvyR7bkTGYJftzS_E5APgCUTDDvs11mZlRuMDqt-n_J5lZqm9vRDaaZr'
    // }
    ctx.body = {
      type: 'image',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      type: 'voice',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    ctx.body = {
      title: message.ThumbMediaId,
      type: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ':' + message.Location_Y + ':' + message.Label
  } else if (message.MsgType === 'link') {
    ctx.body = [{
      title:message.Title,
      description:message.Description,
      picUrl:'http://mmbiz.qpic.cn/mmbiz_jpg/ibzP0uGToXUib2S3zD5wZb9QTbttic8myTJCw5mXYicGjyrUfZPZVpjqTibicWbicZibp1ZEGtW2iamibWUb5cAjVZmWelxw/0',
      url:message.Url
    }]
  }
  
}





  // let mp = require('./index')
  // let client = mp.getWechat()
  // Wechat {
  //   opts: {
  //     appID: 'wx2c5cf038c2e8b7ec',
  //     appSecret: '4cead7539e5d5fab3ed9922fd91ac5d4',
  //     token: 'genee',
  //     getAccessToken: [Function: getAccessToken],
  //     saveAccessToken: [Function: saveAccessToken],
  //     getTicket: [Function: getTicket],
  //     saveTicket: [Function: saveTicket]
  //   },
  //   appID: 'wx2c5cf038c2e8b7ec',
  //   appSecret: '4cead7539e5d5fab3ed9922fd91ac5d4',
  //   getAccessToken: [Function: getAccessToken],
  //   saveAccessToken: [Function: saveAccessToken],
  //   getTicket: [Function: getTicket],
  //   saveTicket: [Function: saveTicket]
  // }







  // console.log('---wechat > reply---ctx------', ctx) // {}
  // {
  //   request: {
  //     method: 'POST',
  //     url: '/xxoo?signature=5f3d0749764eedbdd3a08819c8ab853af4074a8a&timestamp=1516204542&nonce=393602417&openid=oQpKi07GwbjmQFov7UJfPyidAQd4',
  //     header: {
  //       'user-agent': 'Mozilla/4.0',
  //       accept: '*/*',
  //       host: 'yueer.free.ngrok.cc',
  //       pragma: 'no-cache',
  //       'content-length': '276',
  //       'content-type': 'text/xml'
  //     }
  //   },
  //   response: {
  //     status: 404,
  //     message: 'Not Found',
  //     header: {}
  //   },
  //   app: {
  //     subdomainOffset: 2,
  //     proxy: false,
  //     env: 'development'
  //   },
  //   originalUrl: '/xxoo?signature=5f3d0749764eedbdd3a08819c8ab853af4074a8a&timestamp=1516204542&nonce=393602417&openid=oQpKi07GwbjmQFov7UJfPyidAQd4',
  //   req: '<original node req>',
  //   res: '<original node res>',
  //   socket: '<original node socket>'
  // }