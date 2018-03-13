import Vue from 'vue'
import VueRouter from 'vue-router'

//import CargaUniversos from '../components/CargaUniversos.vue'
//import DetalleUniversos from '../components/DetalleUniversos.vue'
//import DetalleUniversosUsuarios from '../components/DetalleUniversosUsuarios.vue'
import Parametros from '../components/Parametros.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Parametros },
]

export default new VueRouter({
    mode: 'history',
    routes, // short for `routes: routes`
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
