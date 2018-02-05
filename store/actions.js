import Services from './services'

export default {
  nuxtServerInit({ commit }, { req }){
    if (req.session && req.session.user) {
      const { nickname, avatarUrl, email } = req.session.user
      const user = {
        nickname,
        avatarUrl,
        email
      }
      commit('SET_USER',user)
    }
  },

  getWechatSignature({ commit }, url){
    return Services.getWechatSignature(url)
  },
  getUserByOAuth({ commit }, url){
    return Services.getUserByOAuth(url)
  },    
  setAuthUser({ commit }, authUser){
    commit('SET_AUTHUSER', authUser)
  },    
  
  async login({commit}, {email, password}){
    try{
      let res = await axios.post('/api/login',{
        email,
        password
      })

      let { data } = res
      if (!res.data) commit('SET_USER', data.user)

      return data
    } catch (e) {
      if (e.response.statue === 401) {
        throw new Error('You can\'t do it')
      }
    }
  },
  async logout({commit}){
    await axios.post('/api/logout')
    commit('SET_USER', null)
  },

  async fetchHouses({state}){
    const res = await Services.allHouse()
    state.data = res.data

    return res
  }




























}