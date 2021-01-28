import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth'
import AlbumBusca from '@/components/album/AlbumBusca'
import AlbumById from '@/components/album/AlbumById'
import AlbumByIdEditar from '@/components/album/AlbumByIdEditar'
import AlbumInserir from '@/components/album/AlbumInserir'
import AlbumEditar from '@/components/album/AlbumEditar'

import ArtistaInserir from '@/components/artista/ArtistaInserir'


Vue.use(VueRouter)

const routes = [{
      name: 'albumBuscaHome',
      path: '/',
      component: AlbumBusca
},{
      name: 'adminPages',
      path: '/admin',
      component: AdminPages
}, {
      name: 'auth',
      path: '/auth',
      component: Auth
},{
      name: 'albumBusca',
      path: '/album',
      component: AlbumBusca
},{
      name: 'albumById',
      path: '/albuns/:id',
      component: AlbumById
},{
      name: 'albumInserir',
      path: '/albumInserir',
      component: AlbumInserir
},{
      name: 'albumEditar',
      path: '/albumEditar',
      component: AlbumEditar
},{
      name: 'albumByIdEditar',
      path: '/albunsEditar/:id',
      component: AlbumByIdEditar
},{
  name: 'artistaInserir',
  path: '/artistaInserir',
  component: ArtistaInserir
}
]

export default new VueRouter({
      mode: 'history',
      routes
})
