<template>
    <div class="artista-pages">
        <PageTitle icon="fa fa-plus" main="Inserir Artista" />
        <b-form>
            <b-row>
                  <b-col md="12" sm="12">
                        <b-form-group label="Nome do artista:" label-for="user-name">
                              <b-form-input id="user-name" type="text"
                              v-model="nome" required
                              placeholder="Informe o Nome do artista..." />
                              <input style="display: none" type="text">
                        </b-form-group>
                  </b-col>
            </b-row>
            <b-row>
                <b-col class="botaoSave" md="12" sm="12" >
                        <b-button variant="warning" :disabled='isDisabled'
                        @click="limpar">Limpar</b-button>
                        <label></label>
                        <b-button class="ml-2" variant="primary" :disabled='isDisabled'
                        @click="salvar">Inserir</b-button>

                </b-col>
                  </b-row>
        </b-form>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import { baseApiUrl , showError, showSucess} from '@/global'
import axios from 'axios'

export default {
      name: "Artista",
      components: {PageTitle},
      data: function() {
        return {
            nome: '',
            isDisabled : false
        }
      },
      methods : {
          limpar(){
                 this.nome = ''
            },
            salvar() {
                  if(!this.nome){
                        return showError("Nome do artista é obrigatório")
                  }
                  this.isDisabled = true

                  axios.post(`${baseApiUrl}/artista?nome=${this.nome}`).then(() =>{
                        showSucess() 
                        return this.$router.push({ name: 'artistaBusca' })
                  }).catch(showError).finally(() =>{
                            this.desbloquiarBotao()  
                            this.limpar()      
                  });
            },
            desbloquiarBotao(){
                  this.isDisabled = false
            },
      }
}
</script>

<style>

</style>