<template>
    <b-container fluid>
        <b-row>
            <b-col cols="4">
                <b-row>
                    <b-col>
                        <b-form-file id="file_input1" v-model="archivoseleccionado" accept=".txt, .csv">
                        </b-form-file>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-table :items="tablainformacion" :fields="campostabla" small>
                            <template slot="check" slot-scope="data">
                                <div v-if="data.item.valor===0">
                                    <i class="fa fa-ban" aria-hidden="true"></i>
                                </div>
                                <div v-else-if="data.item.valor===1">
                                    <i class="fa fa-cog fa-spin fa-fw"></i>
                                </div>
                                <div v-else>
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                </div>
                            </template>
                            <template slot="boton" slot-scope="data">
                                <b-button block :disabled="!BotonHabilitado" variant="primary" size="sm" class="m-1" @click="Getboton(data.item.funcion)">{{data.item.bot}}</b-button>
                            </template>
                        </b-table>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-alert variant="danger"
                                 dismissible
                                 :show="Mostraralertaerrores"
                                 @dismissed="Mostraralertaerrores=0"
                                 @dismiss-count-down="CuentaRegresiva">
                            {{this.AxiosError}}
                            <b-progress variant="warning"
                                        :max="MaximoTiempoAlerta"
                                        :value="Mostraralertaerrores"
                                        height="4px">
                            </b-progress>
                        </b-alert>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="Información del archivo">
                            Nombre: {{this.nombrearchivo}}
                            <br />
                            md5: {{this.md5}}
                            <br />
                            cantidad de filas: {{this.filasarchivo}}
                            <br />
                            Cantidad de registros procesados: {{this.RegistrosProcesados}}
                            <br />
                            Id del proceso: {{this.idproceso}}
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-form-textarea id="textarea1"
                                         plaintext
                                         :rows="5"
                                         :max-rows="5"
                                         v-model="vistapreviaarchivo">
                        </b-form-textarea>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Separador de campos
                    </b-col>
                    <b-col>
                        <b-form-select class="mb-3" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-row>
                            <b-col>
                                <b-button variant="primary" size="sm" class="m-1" @click="AgregarParametros">Agregar parametro</b-button>
                            </b-col>
                            <b-col>
                                <b-button variant="primary" size="sm" class="m-1" @click="QuitarParametros">Eliminar parametro</b-button>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-table :items="tablaparametros" :fields="campostablaparametros" small>
                                <template slot="orden" slot-scope="data">
                                    {{data.item.orden}}
                                </template>

                                <template slot="Descripcion" slot-scope="data">
                                    <b-form-input v-model="data.item.Descripcion"></b-form-input>
                                </template>
                                <template slot="Tipo" slot-scope="data">
                                    <b-form-select v-model="data.item.Tipo" :options="opcionescombo" class="mb-3" />
                                </template>
                                <template slot="Formato" slot-scope="data">
                                    <b-form-input v-model="data.item.Formato"></b-form-input>
                                </template>

                            </b-table>
                        </b-row>
                    </b-col>
                </b-row>


            </b-col>
        </b-row>
        <!--{{this.AxiosError}}-->
    </b-container>
    <!--
    <pre>{{ $data }}</pre>

    </div>
        -->

</template>
<script>
    import axios from 'axios';

    export default {
        name: 'cargauniversos',
        data() {
            return {
                archivoseleccionado: null,
                tamanoarchivo: null,
                nombrearchivo: "",
                nombrearchivoservidor: "",
                tablainformacion:
                [
                    { campo: "Archivo subido", valor: 0, bot: "Subir archivo", funcion: "Upload" },
                    { campo: "Vista previa del archivo", valor: 0, bot: "Vista previa de los datos", funcion: "Preview" },
                    { campo: "Parametros validados", valor: 0, bot: "Validar Parametros", funcion: "ChequearParametros" },
                    { campo: "Insercion generada", valor: 0, bot: "Generar la lista de inserts", funcion: "GenerarInserts" },
                    { campo: "Insercion realizada", valor: 0, bot: "Hacer inserts", funcion: "HacerInsert" }
                ],
                campostabla:
                [
                    "campo",
                    { key: "check", label: "Estado" },
                    { key: "boton", label: "Acciones" }
                ],
                AxiosError: "",
                vistapreviaarchivo: "",
                Mostraralertaerrores: 0,
                MaximoTiempoAlerta: 5,
                RegistrosProcesados: 0,
                BotonesHabilitados: true,
                md5: "",
                filasarchivo: "",
                idproceso: "",
                tablaparametros: [
                    { Descripcion: "", Tipo: 0, Formato: "", orden: 1 }
                ],
                campostablaparametros:
                [
                    { key: "Descripcion", label: "Descripción" },
                    { key: "Tipo", label: "Tipo" },
                    { key: "Formato", label: "Formato" },
                    {key: "orden", label: "orden"}
                ],
                opcionescombo: [
                    { value: 0, text: 'Seleccione una opcion' },
                    { value: 1, text: 'CUIT' },
                    { value: 2, text: 'Fecha' },
                    { value: 3, text: 'Texto' },
                    { value: 4, text: 'Número' }
                ]
            }
        },
        computed: {
            BotonHabilitado() {
                return this.BotonesHabilitados
            }
        },
        watch: {
            AxiosError() {
                if (this.AxiosError.length > 0)
                    this.Mostraralertaerrores = this.MaximoTiempoAlerta
            },
            Mostraralertaerrores() {
                if (this.Mostraralertaerrores === 0) {
                    this.AxiosError = ""
                }
            }
        },
        methods: {
            Upload() {
                this.BotonesHabilitados = false
                this.tablainformacion[0].valor = 1
                if (this.archivoseleccionado === null) {
                    this.AxiosError = "No hay archivo seleccionado"
                    this.tablainformacion[0].valor = 0
                    this.BotonesHabilitados = true
                    return
                }
                var v = new FormData()
                v.append('Archivo', this.archivoseleccionado)
                axios.post('http://localhost:56082/api/archivo/subirarchivo', v)
                    .then(response => {
                        this.tamanoarchivo = response.tamanoaprox
                        this.nombrearchivo = response.data.subido
                        this.nombrearchivoservidor = response.data.nombre
                        this.md5 = response.data.md5
                        this.filasarchivo = response.data.lineas
                        this.tablainformacion[0].valor = 2
                        return response
                    })
                    .catch(error => {
                        this.AxiosError = error.message
                        this.tablainformacion[0].valor = 0
                    })
                this.BotonesHabilitados = true
            },
            ClearFiles() {
                this.archivo = null
            },
            Reiniciarpagina() {
                clearFiles()
                for (i = 0; i < 5; i++) {
                    this.tablainformacion[i].valor = false
                }

            },
            Preview() {
                this.tablainformacion[1].valor = 1
                if (this.nombrearchivo === "") {
                    this.AxiosError = "No hay ningun archivo subido "
                    this.tablainformacion[1].valor = 0
                    return
                }
                var params = {
                    "nombrearchivo": this.nombrearchivoservidor
                }
                axios.post('http://localhost:56082/api/archivo/verpreview2', params)
                    .then(response => {
                        this.vistapreviaarchivo = response.data
                        this.tablainformacion[1].valor = 2
                        return response
                    })
                    .catch(error => {
                        console.log(error);
                        this.tablainformacion[1].valor = 0
                    });
            },
            ChequearParametros() {
                for (var i = 0; i < this.tablaparametros.length; i++) {
                    if (this.tablaparametros[i].Tipo === 0 || this.tablaparametros[i].Descripcion.trim().length == 0) {
                        this.AxiosError = "No se pueden enviar parametros sin tipo o descripción"
                        return
                    }
                }
                if (this.nombrearchivoservidor == "") {
                    this.AxiosError = "No hay ningun archivo enviado"
                    return
                }
                this.tablainformacion[2].valor = 1
                var params = {
                    "ListaParametros": this.tablaparametros,
                    "nombrearchivo": this.nombrearchivoservidor
                }
                axios.post('http://localhost:56082/api/archivo/ValidarParametros', params)
                    .then(response => {
                        this.tablainformacion[2].valor = 2
                        return response
                    }).
                    catch(error => {
                        this.AxiosError = error.response.data.Message
                        this.tablainformacion[2].valor = 0
                    })
            },
            GenerarInserts() {
                if (this.nombrearchivoservidor =="") {
                    this.AxiosError = "No hay ningun archivo subido"
                    return
                }
                if (!(this.tablainformacion[2].valor === 2)) {
                    this.AxiosError = "Debe validar los parametros antes"
                    return
                }
                this.tablainformacion[3].valor = 1
                var params = {
                    "nombrearchivo": this.nombrearchivoservidor
                }
                axios.post('http://localhost:56082/api/archivo/GenerarInserts', params)
                    .then(response => {
                        this.RegistrosProcesados = response.data
                        this.tablainformacion[3].valor = 2
                        return response
                    })
                    .catch(error => {
                        this.AxiosError = error.response.data.Message
                        this.tablainformacion[3].valor = 0
                    })
            },
            HacerInsert() {
                this.tablainformacion[4].valor = 1
                var params = {
                    "nombrearchivo": this.nombrearchivoservidor
                }
                axios.post('http://localhost:56082/api/archivo/HacerInsert', params)
                    .then(response => {
                        this.RegistrosProcesados = response.data
                        this.tablainformacion[4].valor = 2
                        return response
                    })
                    .catch(error => {
                        this.AxiosError = error
                        this.tablainformacion[4].valor = 0
                    })

            },
            Getboton(cual) {

                switch (cual) {
                    case "Upload":
                        this.Upload()
                        break;
                    case "Preview":
                        this.Preview()
                        break;
                    case "ChequearParametros":
                        this.ChequearParametros()
                        break;
                    case "GenerarInserts":
                        this.GenerarInserts()
                        break;
                    case "HacerInsert":
                        this.HacerInsert()
                        break;
                    default:
                        console.log(cual)
                }


            },
            CuentaRegresiva(Mostraralertaerrores) {
                this.Mostraralertaerrores = Mostraralertaerrores
            },
            AgregarParametros() {
                if (this.tablaparametros.length < 15) {
                    this.tablaparametros.push({ descripcion: "1", tipo: 2, formato: "3" })
                }
            },
            QuitarParametros() {
                if (this.tablaparametros.length != 1) {
                    this.tablaparametros.pop()
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
        color: #2c3e50;
        margin-top: 10px;
    }

    .Cabecera {
        background-color: #E1F5FE;
    }

    .menu {
        background-color: #80D8FF;
    }
</style>

