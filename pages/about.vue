<template>
  <section class="container">
    <h1 class="title">
      This page is loaded from the {{ name }}
    </h1>
    <h2 class="info" v-if="name === 'client'">
      Please refresh the page
    </h2>
    <p>
      {{ res }}      
    </p>
    <nuxt-link class="button" to="/">
      Home page
    </nuxt-link>
  </section>
</template>
<script>
export default {
  asyncData ({ req }) {
    return {
      name: req ? 'server' : 'client',
      res:{}
    }
  },
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  },
  beforeMount () {
      // 浏览器访问地址是 about
      // dispatch-store-services|axios.get?url-router-signature|controller/wechat-api-ctx.body-wx.config注入权限-操作
      const wx = window.wx
      let url = window.location.href

      this.$store.dispatch('getWechatSignature', encodeURIComponent(url)).then(res => {        
        // this.req = 'server'
        // console.log(res)
        // const { data } = res
        // if (data.success) {
        //   this.$store.dispatch('setAuthUser', data.user)
        //   const visit = '/' + getUrlParam('state')
        //   this.$router.replace(visit)
        // } else {
        //   throw new Error('获取用户信息出错')
        // }
        // if (res.data.success) {
        //   const params = res.data.params
        //   console.log('seccuess sign', params)
        // }


        if (res.data.seccuess) {
          const params = res.data.params
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: params.appId, // 必填，公众号的唯一标识
            timestamp: params.timestamp , // 必填，生成签名的时间戳
            nonceStr: params.noncestr, // 必填，生成签名的随机串
            signature: params.signature,// 必填，签名，见附录1
            jsApiList: [
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'onMenuShareTimeline',
              'hideAllNonBaseMenuItem',
              'showMenuItems',
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })

          wx.ready(() => {
            wx.hideAllNonBaseMenuItem()
            console.log('seccuess sign')
          })
          
        }

      })

      /*
      this.res = res
      {
        "data": {
          "success": true,
          "params": {
            "noncestr": "y0keywcbmxc",
            "timestamp": "1516247271",
            "signature": "c308422b9e3bdc153620f34d0ace01e88ad33d67",
            "appId": "wx2c5cf038c2e8b7ec"
          }
        },
        "status": 200,
        "statusText": "OK",
        "headers": {
          "date": "Thu, 18 Jan 2018 03:47:51 GMT",
          "connection": "keep-alive",
          "content-length": "161",
          "content-type": "application/json; charset=utf-8"
        },
        "config": {
          "transformRequest": {},
          "transformResponse": {},
          "timeout": 0,
          "xsrfCookieName": "XSRF-TOKEN",
          "xsrfHeaderName": "X-XSRF-TOKEN",
          "maxContentLength": -1,
          "headers": {
            "Accept": "application/json, text/plain"
          },
          "method": "get",
          "url": "/wechat-signature?url=http://yueer.free.ngrok.cc/about"
        },
        "request": {}
      }
      */
  }

}
</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
