<template>
      <div class="album-inserir">
            <PageTitle icon="fa fa-plus" main="Inserir Álbuns" />
            <b-form>
                  <b-row>
                  <b-col md="6" sm="12">
                        <b-form-group label="Nome do álbum:" label-for="user-name">
                              <b-form-input id="user-name" type="text"
                              v-model="album.name" required
                              :readonly="mode === 'remove'"
                              placeholder="Informe o Nome do Álbum..." />
                              <input style="display: none" type="text">
                        </b-form-group>
                  </b-col>
                  <b-col md="6" sm="12">
                        <b-form-group label="Artista:" label-for="user-email">
                              <select class="form-control" v-model="artista" required>
                                    <option v-for="option in artistas" v-bind:value="option.id" :key="option.id">
                                          {{ option.nome }}
                                    </option>
                              </select>
                        </b-form-group>
                  </b-col>
                  </b-row>
                  <b-row>
                        <b-col md="12" sm="12">
                              <input 
                              :disabled='isDisabled'
                              multiple = "multiple"
                              type="file"
                              id="inserir"
                              ref="inputFile"
                              accept="image/jpeg, image/png"
                                 @change="onFileChanged">
                              <label for="inserir" 
                             class="control-label label-bordered fa fa-plus">
                            Inserir imagens</label>
                        </b-col>    
                  </b-row>
                  <b-row v-if="selectedFile.length">
                        <ul v-for="(file,  index) in imagePrevia" :key="file.name">
                              <span>{{selectedFile[index].name.substring(0, 20)}}</span>
                              <br>
                              <img :src="file" class="img-fluid" >
                        </ul>
                  </b-row>
                  <b-row>
                        <b-col class="botaoSave" md="12" sm="12" >
                              <b-button variant="warning" :disabled='isDisabled'
                              @click="limpar">Limpar Campos</b-button>
                              <label></label>
                              <b-button class="ml-2" variant="primary" :disabled='isDisabled'
                              @click="onUpload">Inserir Álbum</b-button>

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
      name: 'AlbumInserir',
      components: {PageTitle},
      data: function() {
        return {
            mode: 'save',
            album: {},
            artista: '',
            artistas: [],
            selectedFile: [],
            imagePrevia: [],
            isDisabled : false
        }
      },
      methods : {
            getArtistas(){
                  const url = `${baseApiUrl}/artista?page=0&size=100`+
                  `&sort=nome,asc`
                  axios(url).then(res => {
                  if(res && res.data){
                        this.artistas = res.data.content
                  }
                  }).catch(showError)
            },
            imageLoaded(event){
                  this.imagePrevia.push(event.target.result)
           },
            onFileChanged (event) {
                  event.target.files.forEach(file => {
                        this.selectedFile.push(file)
                        var reader = new FileReader()
                        reader.addEventListener('load', this.imageLoaded);
                        reader.readAsDataURL(file);
                  })
                       
            },
            desbloquiarBotao(){
                  this.isDisabled = false
            },
            onUpload() {
                  if(!this.album || !this.album.name){
                        return showError("Nome do album é obrigatório")
                  }
                  if(!this.artista || !this.artista > 0){
                        return showError("Selecione um artista")
                  }
                  this.isDisabled = true
                  const formData = new FormData()
                  this.selectedFile.forEach(file => {
                        formData.append('imagens', file)
                  })
                  formData.append('artistaId', this.artista)
                  formData.append('nome', this.album.name)

                  axios.post(`${baseApiUrl}/album`, formData).then(
                        showSucess 
                  ).catch(showError).finally(() =>{
                            this.desbloquiarBotao()  
                            this.limpar()      
                  });
            },
            limpar(){
                 this.artista = null
                 this.album = {}
                 this.selectedFile = []
                 this.imagePrevia = []
                 this.reset()
            },
            reset() {
                  const input = this.$refs.inputFile
                  input.type = 'text'
                  input.type = 'file'
                  }
      },
      mounted() {
            this.getArtistas()
      }
}
</script>

<style>
      .botaoSave {
            align-items: center;
            display: flex;
            justify-content: center;
      }
      .img-fluid{
            width:200px;
            height: 200px;
      }
      .label-bordered {
            border: 1px solid #cecece;
            padding: 10px;
            border-radius: 5px;
            background-color:#007bff;
            border-color: #007bff;
            color: #fff;
      }
      .label-bordered:hover {
            border: 1px solid #cecece;
            padding: 10px;
            border-radius: 5px;
            background-color: #0069d9;
            border-color: #0062cc;
      }
      input[type="file"] { 
            display: none; 
      }
</style>