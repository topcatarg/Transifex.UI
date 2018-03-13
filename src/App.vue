<template>
    <div id="app">
        <!--
    <b-row class="Cabecera">
        <b-col cols="2">
            <b-img fluid src="./assets/logoAfip.png" class="m-3" />
        </b-col>
    </b-row>
        -->
        <navegacion></navegacion>
        <router-view></router-view>

    </div>
</template>

<script>
    import navegacion from './components/BarraNavegacion.vue'

    export default {
        name: 'Aplicacion',
        components: {
            'navegacion': navegacion
        }
    }
</script>


