/*
  SET_XX: (state, params) => {
    state.params = params
  }
*/

export default {
  SET_USER: (state, user) => {
    state.user = user
  },  
  SET_AUTHUSER: (state, authUser) => {
    state.authUser = authUser
  },
  SET_IMDb: (state, data) => {
    state.IMDb = data
  },
  UPDATA_IMDB: (state, { character, i }) => {
    state.IMDb[i] = character
  },
  REMOVE_IMDBCHARACTER: (state, i) => {
    state.IMDb.splice(i, 1)
  },

}