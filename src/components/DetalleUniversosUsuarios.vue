<template>
    <div>
        <b-table :items="tablainformacion" :fields="campostabla" small>
        </b-table>
    </div>
</template>

<script>
    export default {
        name: 'detalla-universos-usuarios',
        data() {
            return {
                tablainformacion: [],
                campostabla:
                [
                    "ID universo",
                    { key: "check", label: "Fecha" },
                    { key: "boton", label: "MD5" },
                    { key: "usado", label: "cantidad de filas" },
                    { key: "usado", label: "usado" }
                ]

            }
        }
    }

</script>