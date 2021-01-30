<template>
  <div class="album-paginacao">
        <PageTitle icon="fa fa-search-plus" main="Pesquisar Álbuns" />
        <b-form>
            <b-row>
                <b-col md="9" sm="12" class="home-filter">
                    <i class="fa fa-search fa-lg"></i>
                    <input type="text" placeholder="Digite para filtrar..."
                        v-model="nomeAlbum"
                        @keyup="debounceInput" maxlength="50">

                        <input style="display: none" type="text">
                </b-col>
                <b-col md="3" sm="12" class="ordena-control">
                    <select class="form-control" v-model="ordenacao" @change="debounceInput">
                        <option disabled value="">Ordem:</option>
                        <option value="ASC">Crescente</option>
                        <option value="DESC">Decrescente</option>
                    </select>
                </b-col>
            </b-row>
        </b-form>
        <ul v-if="albuns && albuns.length">
            <li v-for="album in albuns" :key="album.id">
                <AlbumUnidade :album="album" />
            </li>
        </ul>
        <ul v-else>
            <div v-if="buscando" class="loading">
                <img src="@/assets/loading.gif" alt="Loading">
            </div>
            <span v-else class="alerta" >Nenhum registro encontrado</span>
        </ul>

        <nav class="paginador">
            <v-pagination v-model="offset"
                        :page-count="totalPaginas"
                        :classes="bootstrapPaginationClasses"
                        :labels="customLabels"
                        @change="getAlbuns">
            </v-pagination>
        </nav>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import { baseApiUrl , showError} from '@/global'
import AlbumUnidade from './AlbumUnidade'
import axios from 'axios'
import vPagination from '../template/vue-plain-pagination'
import debounce from 'lodash/debounce';

export default {
      name: 'AlbumHome',
      components: {PageTitle, AlbumUnidade, vPagination},
      data: function() {
        return {
            category: {},
            albuns: [],
            nomeAlbum: "",
            ordenacao: '',

            limit: 3,
            buscando: false,
            offset: 1,
            totalPaginas: 1,
            bootstrapPaginationClasses: { 
                ul: 'pagination',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link'
            },
            customLabels: {
                first: 'Primeira',
                prev: 'Anterior',
                next: 'Próxima',
                last: 'Ultima'
            }
        }
      },
      methods: {
        getAlbuns() {
            sessionStorage.setItem('ordenacao', this.ordenacao);
            sessionStorage.setItem('nomeAlbum', this.nomeAlbum);
            this.buscando = true
            let sort = this.ordenacao === "ASC" || this.ordenacao === "DESC" ?
             "nome,"+this.ordenacao : ''
            const url = `${baseApiUrl}/album?page=${this.offset-1}&size=${this.limit}`+
            `&nomeAlbum=${this.nomeAlbum}&sort=${sort}`
            axios(url).then(res => {
                if(res && res.data){
                    this.albuns = res.data.content
                    this.totalPaginas = res.data.totalPages
                }
                this.buscando = false
            }).catch(showError)
        },
        debounceInput: debounce(function () {
                this.offset = 1;
                this.getAlbuns();
            }, 500)
    },
    mounted() {
        if(sessionStorage.getItem('ordenacao')){
            this.ordenacao = sessionStorage.getItem('ordenacao');
        }
        if(sessionStorage.getItem('nomeAlbum')){
            this.nomeAlbum = sessionStorage.getItem('nomeAlbum');
        }
        this.getAlbuns()
    }
}
</script>

<style>
    .paginador{
        align-items: center;
        justify-content: center;
        display: flex;
        margin-top: -25px;
    }

    .album-paginacao ul {
        list-style-type: none;
        padding: 0px;
        margin-top: 20px;
     }

    .album-paginacao .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }

    .home-filter {
            display: flex;
            justify-content: center;
            align-items: center;

            padding-bottom: 8px;
            border-bottom: 1px solid #AAA;
      }

     .home-filter i {
            color: #AAA;
            margin-right: 10px;
      }
      .home-filter input {
            color: rgb(10, 7, 7);
            font-size: 1.3rem;
            border: 0;
            outline: 0;
            width: 100%;
            background: transparent;
      }
      .select-ordena{
          width: 250px;
          height: 50px;
          font-size: 1.3rem;
      }
      .alerta{
          color: red;
            margin: 20px;
      }

      .ordena-control{
          padding-top: 25px;
      }

    .loading {
        grid-area: content;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>