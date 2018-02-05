// 接口服务相关
    // fn (xx) {
    //   return axios.get(`${xx}`)
    // }
import axios from 'axios'


const baseUrl = ''

class Services {
  getWechatSignature(url){
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }  
  getUserByOAuth(url){
    return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
  }
  allHouse(){
    return axios.get(`${baseUrl}/wiki/houses`)
  }
}

export default new Services()