<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/LogoPJCMT.png" width="200" alt="Logo" />
            <hr>
            <div class="auth-title">{{ 'Login' }}</div>

            <input v-model="user.login" name="login" type="text" placeholder="Login">
            <input v-model="user.password" name="password" type="password" placeholder="Senha">

            <button @click="signin">Entrar</button>

        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/autentica/login`, this.user)
                .then(res => {
                    const tokens = {"accesstoken": res.headers["accesstoken"],
                     "refreshtoken" : res.headers["refreshtoken"],
                     "name" : this.user.login}
                    this.$store.commit('setUser', tokens)
                    localStorage.setItem(userKey, JSON.stringify(tokens))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        },
        signup() {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 400;
        margin-top: 10px;
        margin-bottom: 15px;
        color: #000000;
        
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>
