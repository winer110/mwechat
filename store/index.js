import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'


const createStore = () => {
  return new Vuex.Store({
    state:{

    },
    actions,
    getters,
    mutations
  })
}


export default createStore






