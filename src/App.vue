<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header title="Polícia Judiciária Civil - Sistema de Álbuns de artistas" 
			:hideToggle="!user"
			:hideUserDropdown="!user" />
		<Menu v-if="user" />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Footer />
	</div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "@/global"
import { mapState} from 'vuex'
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from "@/components/template/Loading"

export default {
  name: "App",
  components: {Header, Menu, Content, Footer, Loading},
  computed: mapState(['isMenuVisible', 'user']),
  data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
      this.$store.commit('setUser', null)
      localStorage.removeItem(userKey)

			if(!userData) {
        this.validatingToken = false
      
      //se ja esta na tela de autenticacao nao encaminhar
        let url = window.location.href.split('/')
        if(url && url.indexOf("auth") > 0 && url[url.length-1] === "auth"){
          return
        }else{//fora da tela de autenticacao
          this.$router.push({ name: 'auth' })
          return
        }
			}
 
      try{
        //verifica se token ainda ta valido
        axios.defaults.headers.common['Authorization'] = userData.refreshtoken
        axios.get(`${baseApiUrl}/autentica/refresh`).then(res => {
            if (res != null && res.headers && res.headers["accesstoken"]) {
              const tokens = {"accesstoken": res.headers["accesstoken"],
                          "refreshtoken" : res.headers["refreshtoken"],
                          "name" : userData.name}
              this.$store.commit('setUser', tokens)
              localStorage.setItem(userKey, JSON.stringify(tokens))
              if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
              }
            } else {
              localStorage.removeItem(userKey)
              delete axios.defaults.headers.common['Authorization']
              this.$router.push({ name: 'auth' })
            }
            this.validatingToken = false
        });
      } catch(error) {
          localStorage.removeItem(userKey)
          delete axios.defaults.headers.common['Authorization']
          this.$router.push({ name: 'auth' })
          this.$store.commit('setUser', null)
      }
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
  * {
    font-family: "Lato", sans-serif;
  }
  body{
    margin: 0;
  }

  #app{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    display: grid;
    grid-template-rows: 80px 1fr 40px;
    grid-template-columns: 200px 1fr;
    grid-template-areas: 
    "header header"
    "menu content"
    "menu footer"
  }

  #app.hide-menu{
    grid-template-areas:
    "header header"
    "content content"
    "footer footer"
  }
  
</style>