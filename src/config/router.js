import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth'
import AlbumBusca from '@/components/album/AlbumBusca'
import AlbumById from '@/components/album/AlbumById'


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
}
]

export default new VueRouter({
      mode: 'history',
      routes
})
