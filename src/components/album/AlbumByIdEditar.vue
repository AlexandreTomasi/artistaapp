<template>
    <div class="album-by-id">
        <PageTitle icon="fa fa-times" main="Editar ou Remover"/>
        <div class="album-content">
            <b-form v-if="album">
                <b-row>
                  <b-col md="6" sm="12">
                        <b-form-group label="Nome do álbum:" label-for="user-name">
                              <b-form-input id="user-name" type="text"
                              v-if="album && album.nome"
                              v-model="album.nome" required :disabled="isDisabled"
                              placeholder="Informe o Nome do Álbum..." />
                        </b-form-group>
                  </b-col>
                  <b-col md="6" sm="12">
                        <b-form-group label="Artista:">
                              <b-form-input id="artista-name" type="text"
                                v-if="album && album.artista"
                                v-model="album.artista.nome"
                                :disabled="true" 
                              />
                        </b-form-group>
                  </b-col>
                </b-row>
                <br>
                <b-row>
                        <b-col md="12" sm="12">
                              <input 
                              :disabled="isDisabled"
                              multiple = "multiple"
                              type="file"
                              id="attachments"
                              name="attachments"
                              ref="inputFile"
                              accept="image/jpeg, image/png"
                                 @change="enviarImgs">
                            <label for="attachments" 
                             class="control-label label-bordered fa fa-plus">
                            Inserir mais imagens</label>
                        </b-col>    
                </b-row>
                <b-row>
                    <br>
                    <label v-if="!album.imagens || !album.imagens.length" style="color:indianRed">
                            Nenhuma imagem para exibir
                    </label>
 
                </b-row>
                <b-row class="list-img">
                    <ul v-for="imagem in album.imagens" :key="imagem.id">
                        <label >
                            {{imagem.descricao.substring(0, 20)}}
                        </label>
                        <br>
                        <img :src="imagem.url" alt="album" class="bloco-imagem"> 
                        <br>
                        <b-button pill variant="danger" class="buton-excluir fa fa-trash"
                              :disabled="isDisabled" @click="removerImg(imagem)"></b-button>
                    </ul>
                </b-row>
            </b-form>
            
        </div>
        <div>
            <b-col class="botao-save" md="12" sm="12" >
                    <b-button class="" variant="primary" :disabled='isDisabled'
                            @click="salvarAlbum">Salvar alterações</b-button>
                    <b-button class="ml-2" variant="danger" :disabled='isDisabled'
                            @click="excluirAlbum">Excluir Álbum</b-button>
            </b-col>
        </div>
        <Aguarde v-if="isDisabled"> </Aguarde>
    </div>
</template>

<script>
import { baseApiUrl, showError, showSucess } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import Aguarde from '../template/Aguarde'

export default {
    name: 'AlbumByIdEditar',
    components: { PageTitle, Aguarde},
    data: function() {
        return {
            album: {},
            isDisabled: false,
        }
    },
    mounted() {
        const url = `${baseApiUrl}/album/${this.$route.params.id}`
        axios.get(url).then(res => this.album = res.data)
    },
    methods:{
        atualizarAlbum(id){
            const url = `${baseApiUrl}/album/${id}`
            axios.get(url).then(res => this.album = res.data)
        },
        onFileChanged (event) {
                event.target.files.forEach(file => {
                    this.selectedFile.push(file)
                    var reader = new FileReader()
                    reader.addEventListener('load', this.imageLoaded);
                    reader.readAsDataURL(file);
                })
                    
        },
        enviarImgs(event) {
            this.isDisabled = true
            const formData = new FormData()
            event.target.files.forEach(file => {
                formData.append('imagens', file)
            })
            formData.append('albumId', this.album.id)
            axios.post(`${baseApiUrl}/album/imagem`, formData).then(() =>{
                    showSucess("Imagem inserida com sucesso") }
                ).catch(showError)
                .finally(() =>{
                    this.atualizarAlbum(this.album.id);
                    this.desbloquiarBotao()
                });
        },
        removerImg(image){
            const options = {title: 'Tem certeza que deseja excluir?', cancelLabel: 'Não', okLabel:'Sim'}
            const corpoConfirm = 'A imagem '+image.descricao+" será excluida permanentemente."
            this.$dialogs.confirm(corpoConfirm, options)
            .then(res => { if(res.ok === true){
            axios.delete(`${baseApiUrl}/album/imagem/${image.id}`).then(
                    showSucess("Imagem removida com sucesso") 
                ).catch(showError)
                .finally(() =>{
                   this.album.imagens.splice(this.album.imagens.indexOf(image), 1);
                });
            }})
        },
        salvarAlbum(){
            this.isDisabled = true
            const salvar = {id: this.album.id, nome: this.album.nome}
            axios.put(`${baseApiUrl}/album`, salvar).then(
                    showSucess
                ).catch(showError)
                .finally(() =>{
                this.atualizarAlbum(this.album.id);
                this.desbloquiarBotao()
                return this.$router.push({ name: 'albumEditar' })
                });
                    
        },
        excluirAlbum(){
            const options = {title: 'Tem certeza que deseja excluir?', cancelLabel: 'Não', okLabel:'Sim'}
            const corpoConfirm = 'O álbum '+this.album.nome+" será excluido permanentemente."
            this.$dialogs.confirm(corpoConfirm, options)
            .then(res => { if(res.ok === true){
                this.isDisabled = true
                axios.delete(`${baseApiUrl}/album/${this.album.id}`).then(
                    showSucess 
                ).catch(showError)
                .finally(() =>{
                    sessionStorage.setItem('nomeAlbumEditar', '');
                    this.desbloquiarBotao()
                   return this.$router.push({ name: 'albumEditar' })
                });
            }})
        },
        desbloquiarBotao(){
                  this.isDisabled = false
        },
        showConfirm() {
            const options = {title: 'Confirma?', cancelLabel: 'Cancel', okLabel:'Não'}
            this.$dialogs.confirm('Your message!', options)
            .then(res => {
            console.log(res) // {ok: true|false|undefined}
            })
        }
    }
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
          width: 200px;
          height: 200px;
    }
    .bloco-imagem label{
          display: inline-block;
          width: 100px;
    }

    .list-img{
        display: flex; /* or inline-flex */
        flex-direction: row;
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

.buton-excluir{
    margin-top: 5px;
    margin-left: 80px;
    text-align: center;
}
.botao-save {
    margin-top: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
}
</style>
