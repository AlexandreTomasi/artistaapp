<template>
    <div class="artista-pages">
        <PageTitle icon="fa fa-search-plus" main="Pesquisar Artistas" />
        <b-form>
            <b-row>
            <b-col md="9" sm="12" class="home-filter">
                <i class="fa fa-search fa-lg"></i>
                <input type="text" placeholder="Digite para filtrar..."
                    v-model="nomeArtista" class="filter-field"
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
        <ul v-if="artistas && artistas.length">
            <li v-for="artista in artistas" :key="artista.id">
                <ArtistaUnidade :artista="artista" />
            </li>
        </ul>
        <ul v-else>
            <div v-if="buscando" class="loading">
                <img src="@/assets/loading.gif" alt="Loading">
            </div>
            <span v-else class="alerta" >Nenhum registro encontrado</span>
        </ul>

        <pagination
            v-if="artistas.length"
            :offset="offset"
            :total="total"
            :limit="limit"
            @change-page="changePage"
        />
    </div>
  
</template>

<script>
import PageTitle from '../template/PageTitle'
import { baseApiUrl , showError} from '@/global'
import axios from 'axios'
import Pagination from '../template/Pagination.vue';
import debounce from 'lodash/debounce';
import ArtistaUnidade from './ArtistaUnidade'

export default {
      name: "ArtistaBusca",
      components: {PageTitle, ArtistaUnidade, Pagination},
      data: function() {
        return {
            category: {},
            artistas: [],
            nomeArtista: "",
            ordenacao: '',

            offset: 0,
            total: 0,
            limit: 3,
            buscando: false
        }
      },
      methods: {
        changePage(value) {
            this.offset = value;
            this.getAlbuns();
        },
        getAlbuns() {
            sessionStorage.setItem('ordenacaoArtista', this.ordenacao);
            sessionStorage.setItem('nomeArtista', this.nomeArtista);
            this.buscando = true
            let sort = this.ordenacao === "ASC" || this.ordenacao === "DESC" ?
             "nome,"+this.ordenacao : ''
            const url = `${baseApiUrl}/artista?page=${this.offset}&size=${this.limit}`+
            `&filtro=${this.nomeArtista}&sort=${sort}`
            axios(url).then(res => {
                if(res && res.data){
                    this.artistas = res.data.content
                    this.total = res.data.totalElements
                }
                this.buscando = false
            }).catch(showError)
        },
        debounceInput: debounce(function () {
                this.offset = 0;
                this.getAlbuns();
            }, 500)
    },
    mounted() {
        if(sessionStorage.getItem('ordenacaoArtista')){
            this.ordenacao = sessionStorage.getItem('ordenacaoArtista');
        }
        if(sessionStorage.getItem('nomeArtista')){
            this.nomeArtista = sessionStorage.getItem('nomeArtista');
        }
        this.getAlbuns()
    }
}
</script>

<style>
    .artista-pages ul {
        list-style-type: none;
        padding: 0px;
        margin-top: 20px;
     }

    .artista-pages .load-more {
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