import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

import { signature, redirect, oauth } from '../controllers/wechat'

import { resolve } from 'path'

export const router = app => {
	const router = new Router()
// 验证的请求
	router.all('/xxoo',wechatMiddle(config.wechat, reply))
	
	router.get('/wechat-signature', signature)
	router.get('/wechat-redirect', redirect)
	router.get('/wechat-oauth', oauth)

	router.get('/upload', async (ctx, next) => {
		let mp = require('../wechat')
		let client = mp.getWechat()

		// client.handleOperation('uploadMaterial', type, file) //temp
		// const data = await client.handle('uploadMaterial', 'video', resolve(__dirname, '../../ice.mp4')) //temp
		// console.log(data)
	})
	app
		.use(router.routes())
		.use(router.allowedMethods())
}

















// {
//     request: {
//         method: 'GET',
//         url: '/xxoo?signature=945109008d203ee7760b85bba384da061de5df4a&echostr=6717093670814477183&timestamp=1514384237&nonce=2222039262',
//         header: {
//             'user-agent': 'Mozilla/4.0',
//             accept: '*/*',
//             host: 'ahab.free.ngrok.cc',
//             pragma: 'no-cache',
//             connection: 'Keep-Alive'
//         }
//     },
//     response: {
//         status: 404,
//         message: 'NotFound',
//         header: {
            
//         }
//     },
//     app: {
//         subdomainOffset: 2,
//         proxy: false,
//         env: 'development'
//     },
//     originalUrl: '/xxoo?signature=945109008d203ee7760b85bba384da061de5df4a&echostr=6717093670814477183&timestamp=1514384237&nonce=2222039262',
//     req: '<originalnodereq>',
//     res: '<originalnoderes>',
//     socket: '<originalnodesocket>'
// }