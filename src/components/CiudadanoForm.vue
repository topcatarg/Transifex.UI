<template>
    <div>
        <div>Agregar ciudadano</div>
        <div>{{ datamixin }}</div>
        <input v-model="ciudadano.cuit" placeholder="Cuit"/>
        <input v-model="ciudadano.nombre" placeholder="Nombre"/>
        <input v-model="ciudadano.apellido" placeholder="Apellido"/>
        <input :disabled="!validForm" type="button" value="Agregar" @click="agregarCiudadano"/>
        <!-- <pre>{{ $data }}</pre> -->
    </div>
</template>

<script>
    import axios from 'axios'
    import { validateCuit } from '../mixins/validateCuit'

    export default {
        name: 'ciudadano-form',
        mixins: [validateCuit],
        data() {
            return {
                ciudadano: {
                    cuit: null,
                    nombre: null,
                    apellido: null
                }
            }
        },
        methods: {
            agregarCiudadano() {

                if (this.validateCuit(this.ciudadano.cuit)) {
                    console.log("cuit valido")
                } else {
                    console.error("cuit INVALIDO !!!!")
                    return false
                }
                var ciudadano = {}
                ciudadano.cuit = this.ciudadano.cuit
                ciudadano.nombre = this.ciudadano.nombre
                ciudadano.apellido = this.ciudadano.apellido
                this.$emit('agregarCiudadano', ciudadano)

                axios({
                    method: 'post',
                    url: 'http://localhost:3000/ciudadanos',
                    data: ciudadano
            //              headers: {
            //                'content-type': 'application/json'
            //              }
                })
                .then(response => { 
                    if (response.status == 201) {
                        console.log("ingresado corectamente")
                    } else {
                        console.log(response.status)
                    }
                    return response; 
                })
                .catch(function (error) {
                    console.log(error)
                })   

            }
        },

        computed: {
            validForm() {
                return this.ciudadano.cuit && this.ciudadano.nombre && this.ciudadano.apellido ? true : false
            }
        }
    }
</script>