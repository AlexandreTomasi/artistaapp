<template>
    <div class="album-by-id">
        <PageTitle icon="fa fa-list" :main="album.nome"/>
        <div class="album-content" >
            <div>
                  <span> <strong> Álbum nome: </strong></span>
                  <span>{{album.nome}}</span>
            </div>
            <div>
                  <span> <strong> Artista nome: </strong></span>
                  <span v-if="album.artista">{{album.artista.nome}}</span>
            </div>
            <div>
                  <span> <strong> Capas:</strong></span>
                  <span v-if="!album.imagens || !album.imagens.length" style="color:indianRed">
                        Nenhuma imagem para exibir
                  </span>
            </div>
            <b-row class="list-img">
                  
                  <ul v-for="imagem in album.imagens" :key="imagem.id">
                        <div class="bloco-imagem">
                              <img :src="imagem.url" alt="album" class="bloco-imagem"> 
                              <br>
                              <label >
                                    {{imagem.descricao.substring(0, 20)}}
                              </label>
                        </div>

                  </ul>
                 
            </b-row>
        </div>
        
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
    name: 'AlbumById',
    components: { PageTitle },
    data: function() {
        return {
            album: {}
        }
    },
    mounted() {
        const url = `${baseApiUrl}/album/${this.$route.params.id}`
        axios.get(url).then(res => this.album = res.data)
    },
}
</script>

<style>
    .album-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .album-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .album-content img {
        max-width: 100%;
    }

    .album-content :last-child {
        margin-bottom: 0px;
    }
    .album-content span {
      font-size: 1.4rem;
    }

    .bloco-imagem{
          height: 50%;
          width: 50%;
    }
    .bloco-imagem label{
          display: inline-block;
          width: 100px;
    }

    .list-img{
        display: flex; /* or inline-flex */
        flex-direction: row;
    }

    .bloco-imagem{
          width: 200px;
          height: 200px;
    }
</style>
