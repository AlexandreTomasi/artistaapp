<template>
    <div class="album-item">
        <router-link :to="{ name: 'albumByIdEditar', params: { id: album.id } }">
            <div class="album-item-image d-none d-sm-block">
                  <ul v-if="album.imagens.length">
                        <img :src="album.imagens[0].url"
                              height="130" width="150" alt="album">
                  </ul>
                  <ul v-else >
                        <img
                              src="@/assets/semImagem.png"
                              height="130" width="150" alt="album">
                  </ul>
            </div>
            <div class="album-item-info">
                <h2>{{ album.nome }}</h2>
                <span class="album-item-author">
                    <strong>Autor: </strong>{{ album.artista.nome }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'AlbumUnidadeEditar',
    props: ['album']
}
</script>

<style>
    .album-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .album-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .album-item-info h2 {
        font-size: 1.7rem;
    }

    .album-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .album-item-image img {
        border-radius: 5px;
    }

    .album-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .album-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
