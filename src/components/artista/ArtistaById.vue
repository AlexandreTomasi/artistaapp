<template>
    <div class="artista-by-id">
        <PageTitle icon="fa fa-times" main="Editar ou Remover"/>
        <div class="artista-content">
            <b-form v-if="artista">
                <b-row>
                  <b-col md="12" sm="12">
                        <b-form-group label="Nome do artista:" label-for="user-name">
                              <b-form-input id="user-name" type="text"
                              v-model="artista.nome" required :disabled="isDisabled"
                              placeholder="Informe o Nome do Artista..." />
                        </b-form-group>
                  </b-col>
                </b-row>
            </b-form>
            
        </div>
        <div>
                <b-col class="botao-save" md="12" sm="12" >
                      <b-button class="" variant="primary" :disabled='isDisabled'
                              @click="salvarArtista">Salvar alterações</b-button>
                      <b-button class="ml-2" variant="danger" :disabled='isDisabled'
                              @click="excluirArtista">Excluir Artista</b-button>
                </b-col>
            </div>
        <LoadingFullTela v-if="isDisabled"> </LoadingFullTela>
    </div>
</template>

<script>
import { baseApiUrl, showError, showSucess } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import LoadingFullTela from '../template/LoadingFullTela'

export default {
    name: 'ArtistaById',
    components: { PageTitle, LoadingFullTela },
    data: function() {
        return {
            artista: {},
            isDisabled: false
        }
    },
    mounted() {
        const url = `${baseApiUrl}/artista/${this.$route.params.id}`
        axios.get(url).then(res => this.artista = res.data)
    },
    methods:{
        salvarArtista(){
            this.isDisabled = true
            const salvar = {id: this.artista.id, nome: this.artista.nome}
            axios.put(`${baseApiUrl}/artista`, salvar).then(
                    showSucess
                ).catch(showError)
                .finally(() =>{
                   this.desbloquiarBotao()
                   return this.$router.push({ name: 'artistaBusca' })
                });
        },
        excluirArtista(){
            const options = {title: 'Tem certeza que deseja excluir?', cancelLabel: 'Não', okLabel:'Sim'}
            const corpoConfirm = 'O artista '+this.artista.nome+" será excluido permanentemente."
            this.$dialogs.confirm(corpoConfirm, options)
            .then(res => { if(res.ok === true){
                this.isDisabled = true
                axios.delete(`${baseApiUrl}/artista/${this.artista.id}`).then(
                        showSucess 
                    ).catch(showError)
                    .finally(() =>{
                        this.desbloquiarBotao()
                        sessionStorage.setItem('nomeArtista', '');
                    return this.$router.push({ name: 'artistaBusca' })
                    });
            }})
        },
        desbloquiarBotao(){
            this.isDisabled = false
        }
    }
}
</script>

<style>
    .artista-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .artista-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .artista-content :last-child {
        margin-bottom: 0px;
    }
    .artista-content span {
      font-size: 1.4rem;
    }

    .teste{
        content: 'Import Settings';
    }

.botao-save {
    margin-top: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
}
</style>
