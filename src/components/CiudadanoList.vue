<template>
    <div>
        <slot></slot>
        <slot name="subtitle"></slot>
        <ciudadano v-for="(ciudadanoFor, i) in lista"
                    :key="i"
                    :datos="ciudadanoFor">
        </ciudadano>
    </div>
</template>

<script>
    import axios from 'axios'
    import Ciudadano from './Ciudadano.vue'

    export default {
        name: 'ciudadano-list',
        components: { Ciudadano },
        props: {
            lista: {
                type: Array,
                required: true
            }
        }
    }
</script>