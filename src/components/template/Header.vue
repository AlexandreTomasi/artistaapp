<template>
  <header class="header">
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
              <i class="fa fa-lg" :class="icon"
              style="font-size: 2.1rem;"></i>
      </a>
      <h1 class="title">
            <router-link to='/'> {{title}} </router-link>
      </h1>
      <user-dropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
      name: 'Header',
      components: { UserDropdown },
      props:{
            title: String,
            hideToggle: Boolean,
            hideUserDropdown: Boolean
      },
      computed:{
            icon(){
                  return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-right"
            }
      },
      methods:{
            toggleMenu(){
                  this.$store.commit('toggleMenu')
            }
      }
}
</script>

<style>
      .header{
            grid-area: header;
            background: linear-gradient(to right, #000, #616060);

            display: flex;
            justify-content: center;
            align-items: center;
      }
      .title{
            font-size:  2.1rem;
            color: #fff;
            font-weight: 400;
            flex-grow: 1;
            text-align: center;
      }
      .title a {
            color: #FFF;
            text-decoration: none;
      }

      .title a:hover {
            color: rgb(255, 255, 255);
            text-decoration: none;
      }

      header.header > a.toggle {
            width: 60px;
            height: 100%;
            color: #fff;
            justify-self: flex-start;
            text-decoration: none;

            display: flex;
            justify-content: center;
            align-items: center;
      }

      header.header > a.toggle:hover {
            color: #fff;
            background-color: rgba(0, 0, 0, 0.2);

      }

      @media only screen and (max-width: 630px) {
            .title {
                  font-size:  1.1rem;
            }
      }

</style>