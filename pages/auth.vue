<template>
  <section class="container">
    <h1 class="title">
      auth测试页面
    </h1>
  </section>
</template>
<script>

const getUrlParams = url => {
  const reg = new RegExp('(^|&)' + url + '=([^&]*)(&|$)')
  const params = window.location.search.substr(1).match(reg)
  return params ? decodeURIComponent(result[2]) : null
}

export default {  
  head () {
    return {
      title: `auth测试页面`
    }
  },
  beforeMount () {
    /*   
    浏览器访问地址是auth
    dispatch-store-services|axios.get?url-router-signature|controller/wechat-api-ctx.body-wx.config注入权限-操作
    构建地址 wechat-redirect?a=1&b=2
    */
    let url = window.location.href

    this.$store.dispatch('getUserByOAuth', encodeURIComponent(url)).then(res => {
      // if (res.data.success) {
      //   console.log(res.data)
      //   this.$store.dispatch('setAuthUser', data.user)
      //   const visit = '/' + getUrlParams('state')
      //   this.$router.push(visit)
      // } else {
      //   throw new Error('获取用户信息出错')
      // }
    })

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
