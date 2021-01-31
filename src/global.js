import Vue from 'vue'

export const userKey = '__knowledge_user'
export const baseApiUrl = 'http://localhost:8080/v1'

export function showError(e) {
    if(e && e.response && e.response.data && e.response.data.error) {
        Vue.toasted.global.defaultError({ msg : e.response.data.error })
    } else if(e && e.response && e.response.data && e.response.data.message) {
        if(e.response.data.status == "409"){
            Vue.toasted.global.defaultError({ msg : 
                "Esse registro está vinculado a outro registro,"+
                " e não pode ser excluído ou alterado." })
        }else{
            Vue.toasted.global.defaultError({ msg : e.response.data.message })
        }
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export function showSucess(e) {
    if(typeof e === 'string') {
        Vue.toasted.global.defaultSuccess({ msg : e })
    } else {
        Vue.toasted.global.defaultSuccess()
    }
}

export default { baseApiUrl, showError, userKey }