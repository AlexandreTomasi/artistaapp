import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import store from '../config/store'

//intercepta as requisições de resposta
axios.interceptors.response.use(response => response, error => {
    //caso o refresh token ja tenha vencido volta para tela de login
    if (store.state.atualizandoToken) {
        //seta usuario como null e limpa o storage do navegador
        store.commit('setUser', null)
        localStorage.removeItem(userKey)
        store.commit('setAtualizandoToken', false);
        return window.location = '/auth'
    }
    //obtem o status da resposta
    const status = error.response ? error.response.status : null
    //caso seja 403 Forbidden ou seja tokem expirado e/ou invalido
    if (status === 403) {
        //solicitar atualização do tokem.
        return refreshToken(store).then(() => {
            //após ser feito a atualização do token, refazer a requisição original
            //adicionando o token atualizado na requisição nova
            error.config.headers['Authorization'] = store.state.user.accesstoken;
            error.config.baseURL = undefined;
            store.commit('setAtualizandoToken', false);
            return axios.request(error.config);
        });
    }

    return Promise.reject(error);
});

function refreshToken(store) {
    if (store.state.atualizandoToken) {
        return store.state.refreshingCall;
    }
    const userData = JSON.parse(localStorage.getItem(userKey))
    if(!userData) {
        window.location = '/auth'
        return
    }

    store.commit('setAtualizandoToken', true);
    axios.defaults.headers.common['Authorization'] = userData.refreshtoken
    const refreshingCall = axios.get(`${baseApiUrl}/autentica/refresh`).then(res => {
            const tokens = {"accesstoken": res.headers["accesstoken"],
            "refreshtoken" : res.headers["refreshtoken"],
            "name" : userData.name}
            store.commit('setUser', tokens)
            localStorage.setItem(userKey, JSON.stringify(tokens))
            return Promise.resolve(true);
    });
    store.commit('setRefreshingCall', refreshingCall);
    return refreshingCall;
}