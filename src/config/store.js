import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
      state: {
            isMenuVisible: false,
            user: null,
            atualizandoToken: false,
            refreshingCall: null
      },
      mutations:{
            toggleMenu(state, isVisible){
                  if(!state.user) {
                        state.isMenuVisible = false
                        return
                    }
        
                    if(isVisible === undefined) {
                        state.isMenuVisible = !state.isMenuVisible
                    } else {
                        state.isMenuVisible = isVisible
                    }
            },
            setUser(state, user) {
                state.user = user
                if(user) {
                    axios.defaults.headers.common['Authorization'] = `${user.accesstoken}`
                    state.isMenuVisible = true
                } else {
                    delete axios.defaults.headers.common['Authorization']
                    state.isMenuVisible = false
                }
            },
            setAtualizandoToken(state, atualizandoToken){
                state.atualizandoToken = atualizandoToken
            },
            setRefreshingCall(state, refreshingCall){
                state.refreshingCall = refreshingCall
            }
        }
})