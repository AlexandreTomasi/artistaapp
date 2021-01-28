<template>
    <aside class="menu" v-show="isMenuVisible">
        <ul class="mcd-menu">
            <li>
                <a class="router" style="border-top: 2px solid #EEE;">
                    <i class="fa fa-users"></i>
                    <strong>Artistas</strong>
                </a>
                <ul style="list-style: none;">
                    <li>
                        <router-link to="/artistaBusca" class="router">
                            <i class="fa fa-search"></i>Buscar/Editar
                        </router-link>
                    </li>                       
                    <li>
                        <router-link to="/artistaInserir" class="router">
                        <i class="fa fa-plus"></i>Inserir Artista
                        </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <a class="router !active">
                    <i class="fa fa-list"></i>
                    <strong>Álbuns</strong>
                </a>
                <ul style="list-style: none;">
                    <li>
                        <router-link to="/album" class="router" >
                            <i class="fa fa-search"></i>Buscar
                        </router-link>
                    </li>                       
                    <li>
                        <router-link to="/albumInserir" class="router">
                        <i class="fa fa-plus"></i>Inserir Álbum
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/albumEditar" class="router">
                        <i class="fa fa-edit"></i>Editar Álbum
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #000, #2b2c2e);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .router{
        font-weight: 800;
        font-size: 1.3rem;
    }

    .router:hover{
        font-weight: 800;
        font-size: 1.3rem;
        background: linear-gradient(to right, #4a4e50, #535658);
    }



    .clearfix:before,
    .clearfix:after {
        content: " ";
        display: table;
    }

    .clearfix:after {
        clear: both;
    }
    .clearfix {
        *zoom: 1;
    }


    
    .mcd-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    /*height: 100px;*/
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    /*background-color: white;*/
    /* Define o tamanho do menu*/
    width: 200px;
    /* == */
    }
    .mcd-menu li {
    position: relative;
    /*float:left;*/
    }
    .mcd-menu li a {
    display: block;
    text-decoration: none;
    padding: 9px 15px;
    color: white;
    
    /* == */
    text-align: left;
    height: 45px;
    position: relative;
    border-bottom: 2px solid #EEE;
    /* == */
    }
    .mcd-menu li a i {
    
    /* == */
    float: left;
    font-size: 20px;
    margin: 0 10px 0 0;
    /* == */
    
    }
    /* == */
    .mcd-menu li a p {
    float: left;
    margin: 0 ;
    }
    /* == */

    .mcd-menu li a strong {
    display: block;
    text-transform: uppercase;
    }

    .mcd-menu li:hover > a i {
        opacity: 1;
        -webkit-animation: moveFromTop 300ms ease-in-out;
        -moz-animation: moveFromTop 300ms ease-in-out;
        -ms-animation: moveFromTop 300ms ease-in-out;
        -o-animation: moveFromTop 300ms ease-in-out;
        animation: moveFromTop 300ms ease-in-out;
    }
    .mcd-menu li:hover a strong {
        opacity: 1;
        -webkit-animation: moveFromLeft 300ms ease-in-out;
        -moz-animation: moveFromLeft 300ms ease-in-out;
        -ms-animation: moveFromLeft 300ms ease-in-out;
        -o-animation: moveFromLeft 300ms ease-in-out;
        animation: moveFromLeft 300ms ease-in-out;
    }

    .mcd-menu li:hover > a {
    color: #e67e22;
    }
    .mcd-menu li a.active {
    position: relative;
    color: #e67e22;
    border:0;
    border-top: 4px solid #e67e22;
    border-bottom: 4px solid #e67e22;
    margin-top: -4px;
    box-shadow: 0 0 5px #DDD;
    -moz-box-shadow: 0 0 5px #DDD;
    -webkit-box-shadow: 0 0 5px #DDD;
    width: 100%;

    
    /* == */
    border-left: 4px solid #e67e22;
    border-right: 4px solid #e67e22;
    margin: 0 0px;
    /* == */
    }
    .mcd-menu li a.active:before {
    content: "";
    position: absolute;
    /*top: 0;
    left: 45%;
    border-top: 5px solid #e67e22;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;*/
    
    /* == */
    top: 42%;
    left: 0;
    border-left: 5px solid #e67e22;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    /* == */
    }

    /* == */
    .mcd-menu li a.active:after {
    content: "";
    position: absolute;
    top: 42%;
    right: 0;
    border-right: 5px solid #e67e22;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    }
    /* == */

    @-webkit-keyframes moveFromTop {
        from {
            opacity: 0;
            -webkit-transform: translateY(200%);
            -moz-transform: translateY(200%);
            -ms-transform: translateY(200%);
            -o-transform: translateY(200%);
            transform: translateY(200%);
        }
        to {
            opacity: 1;
            -webkit-transform: translateY(0%);
            -moz-transform: translateY(0%);
            -ms-transform: translateY(0%);
            -o-transform: translateY(0%);
            transform: translateY(0%);
        }
    }
    @-webkit-keyframes moveFromLeft {
        from {
            opacity: 0;
            -webkit-transform: translateX(200%);
            -moz-transform: translateX(200%);
            -ms-transform: translateX(200%);
            -o-transform: translateX(200%);
            transform: translateX(200%);
        }
        to {
            opacity: 1;
            -webkit-transform: translateX(0%);
            -moz-transform: translateX(0%);
            -ms-transform: translateX(0%);
            -o-transform: translateX(0%);
            transform: translateX(0%);
        }
    }
    @-webkit-keyframes moveFromRight {
        from {
            opacity: 0;
            -webkit-transform: translateX(-200%);
            -moz-transform: translateX(-200%);
            -ms-transform: translateX(-200%);
            -o-transform: translateX(-200%);
            transform: translateX(-200%);
        }
        to {
            opacity: 1;
            -webkit-transform: translateX(0%);
            -moz-transform: translateX(0%);
            -ms-transform: translateX(0%);
            -o-transform: translateX(0%);
            transform: translateX(0%);
        }
    }



    .mcd-menu li ul,
    .mcd-menu li ul li ul {
    position: absolute;
    height: auto;
    /* tamanho do submenu*/ 
    min-width: 220px;
    padding: 0;
    margin: 0;
    background: linear-gradient(to right, #232526, #414345);
    border-left: 4px solid #e67e22;

    opacity: 0;
    visibility: hidden;
    transition: all 300ms linear;
    -o-transition: all 300ms linear;
    -ms-transition: all 300ms linear;
    -moz-transition: all 300ms linear;
    -webkit-transition: all 300ms linear;
    /*top: 130px;*/
    z-index: 1000;
    
    /* == */
    left:200px;
    top: 0px;
    /* == */
    }
    .mcd-menu li ul:before {
    content: "";
    position: absolute;
    /*top: -8px;
    left: 23%;
    border-bottom: 5px solid #e67e22;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;*/
    
    /* == */
    top: 25px;
    left: -9px;
    border-right: 5px solid #e67e22;
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    /* == */
    }
    .mcd-menu li:hover > ul,
    .mcd-menu li ul li:hover > ul {
    display: block;
    opacity: 1;
    visibility: visible;
    /*top: 100px;*/
    
    /*posição do sub menu */
    left:200px;
    /* == */
    }
    /*.mcd-menu li ul li {
    float: none;
    }*/
    .mcd-menu li ul li a {
    padding: 10px;
    text-align: left;
    border: 0;
    border-bottom: 1px solid #EEE;
    
    /* == */
    height: auto;
    /* == */
    }
    .mcd-menu li ul li a i {
        font-size: 16px;
        display: inline-block;
        margin: 0 10px 0 0;
        margin-top: 6px;
    }
    .mcd-menu li ul li ul {
    left: 230px;
    top: 0;
    border: 0;
    border-left: 4px solid #e67e22;
    }  
    .mcd-menu li ul li ul:before {
    content: "";
    position: absolute;
    top: 15px;
    /*left: -14px;*/
    /* == */
    left: -9px;
    /* == */
    border-right: 5px solid #e67e22;
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    }
    .mcd-menu li ul li:hover > ul {
    top: 0px;
    left: 200px;
    }

    .mcd-menu li ul li a i{
          margin-top: 6px;  
    }

    @media only screen and (max-width: 630px) {
        .mcd-menu li ul {
                top: 150px;
                margin: -150px;
                min-width: 100px;
        }
        .mcd-menu li ul li{
            width: 146px;
            font-size:  1.1rem;
        }
        .mcd-menu li ul li a{
            font-size:  1.0rem;
        }

        .mcd-menu li ul:hover {
                top: 150px;
                margin: -150px;
                min-width: 100px;
        }
        .mcd-menu li ul li:hover{
            width: 146px;
            font-size:  1.1rem;
        }
        .mcd-menu li ul li a:hover{
            font-size:  1.0rem;
        }
    }
</style>
