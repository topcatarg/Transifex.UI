<template>
    <div class="card">
        <div>Ciudadano</div>
        <slot>
            <div>{{ razonSocial }}</div>
            <div>{{ datos.cuit }}</div>
        </slot>
    </div>
</template>

<script>
    export default {
        name: 'ciudadano',
        props: {
            datos: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
            }
        },
        computed: {
            razonSocial() {
                return this.datos.apellido + ", " + this.datos.nombre
            }
        }
    }
</script>

<style scoped>
    .card {
        border: #AAA solid 1px;
        padding: 6px 9px;
        border-radius: 3px;
        margin-bottom: 5px;
    }
</style>