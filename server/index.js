import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import R from 'ramda'
// 路径引用
import { resolve } from 'path'
const r = path => resolve(__dirname, path)
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env === 'production')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3001

// 中间件的数组
const MIDDLEWARES = ['database', 'router']

class Server {
  constructor () {
    this.app = new Koa()
    this.useMiddleWares(this.app)(MIDDLEWARES)
  }
// 中间件统一加载处理
  useMiddleWares (app) {
    // 从右往左进行函数组合，右侧函数的return是左侧函数的参数
    return R.map(R.compose(
      R.map(i => i(app)),
      require,
      i => `${r('./middleware')}/${i}`  // 绝对路径
    ))
  }

  async start(){
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)
    // Build in development
    if (config.dev) {
      const builder = new Builder(nuxt)
      await new Builder(nuxt).build()
    }

    this.app.use(async (ctx, next) => {
      await next()
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    })

    this.app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
    
  }
}

const app = new Server()
app.start()




