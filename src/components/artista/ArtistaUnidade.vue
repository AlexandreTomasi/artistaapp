<template>
    <div class="artista-item">
          
        <router-link :to="{ name: 'artistaById', params: { id: artista.id } }">
            <div class="artista-item-image d-none d-sm-block">
                  <img
                        src="@/assets/artistaSemFoto.png"
                        height="130" width="150" alt="artista">
            </div>
            <div class="artista-item-info">
                <h2>{{ artista.nome }}</h2>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ArtistaUnidade',
    props: ['artista']
}
</script>

<style>
    .artista-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .artista-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .artista-item-info h2 {
        font-size: 1.7rem;
    }

    .artista-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .artista-item-image img {
        border-radius: 5px;
    }

    .artista-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .artista-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
