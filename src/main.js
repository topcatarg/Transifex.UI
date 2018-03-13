import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import router from './router/router.js'

router.beforeEach((to, from, next) => {
    if (!to.meta.private)
        next()
    else {
        alert("Perdiste la sesiòn")
        next("/")
    }
})


Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    router,
  render: h => h(App)
})
