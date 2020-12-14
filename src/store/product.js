import firebase from 'firebase/app'

export default {
  state: {
  },
  mutations: {
    
    setError(state, error) {
      state.error = error
    },
  },
  actions: {  
    async fetchAmount({commit}) {
      try {
        const info = (await firebase.database().ref(`/products`).once('value')).val()
        return {...info}
      } catch (e) {
        commit('setError', e)
        throw e
      } 
    },
    async fetchProduct({commit}) {
      try {
        const info = (await firebase.database().ref(`/products/color`).once('value')).val()
        return Object.keys(info).map(key => ({...info[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      } 
    },
    async fetchLimited({commit}) {
      try {
        const info = (await firebase.database().ref(`/products/limit`).once('value')).val()
        return Object.keys(info).map(key => ({...info[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      } 
    },
    async updateAmount({commit}, {amountSimple, amountLimited, amountCustom}) {
      try {
        const info = await firebase.database().ref(`/products`).update({amountSimple, amountLimited, amountCustom})
        return {amountSimple, amountLimited, amountCustom, id: info.key}
      } catch (e) {
        commit('setError', e)
        throw e
      } 
    },
    
  },
  
}