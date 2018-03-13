<template>

    <div>
        <b-container class="mt-3">
            <b-row>
                <b-col cols="6">
                    <b-container fluid>
                        <b-row class="mb-1">
                            <b-col>Original string</b-col>
                            <b-col>
                                <b-form-input v-model="stringRegex"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1">
                            <b-col>Translated string</b-col>
                            <b-col>
                                <b-form-input v-model="translationRegex"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1">
                            <b-col>Reviewed</b-col>
                            <b-col>
                                <b-form-select v-model="isReviewed"
                                               :options="comboOptions"
                                               class="mb-3" />
                            </b-col>
                        </b-row>
                        <b-row class="mb-1">
                            <b-col>Witn non reviewed suggestions</b-col>
                            <b-col>
                                <b-form-select v-model="withNonReviewedSuggestions"
                                               :options="comboOptions"
                                               class="mb-3" />
                            </b-col>
                        </b-row>
                        <b-row class="mb-1">
                            <b-col>Only include translations made by the following users</b-col>
                            <b-col>
                                <b-form-input v-model="onlyTranslationsFromUsers"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1">
                            <b-col>Only include suggestions made by the following users</b-col>
                            <b-col>
                                <b-form-input v-model="onlySuggestionsFromUsers"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col></b-col>
                            <b-col>
                                <b-button v-on:click="ClickSearch">
                                    Search...
                                </b-button>
                            </b-col>
                        </b-row>

                    </b-container>
                </b-col>
            </b-row>
        </b-container>

            <b-table class="mt-3 mx-3"
                     striped hover :items="TableValues" :fields="TableFields"></b-table>

    </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: 'parametros',
        data() {
            return {
                comboOptions: [
                    {value: null, text: 'Please select an option'},
                    { value: 1, text: 'YES' },
                    { value: 2, text: 'NO' },
                ],
                stringRegex: "",
                translationRegex: "",
                isReviewed: null,
                withNonReviewedSuggestions: null,
                onlyTranslationsFromUsers: "",
                onlySuggestionsFromUsers: "",
                TableFields:
                [
                    { key: "id", label: "Id" },
                    { key: "string", label: "String" },
                    { key: "reviewed", label: "Reviewed" },
                    { key: "comment", label: "Comment" },
                    { key: "stringHash", label: "StringHash" },
                    {key: "key", label: "Key"}
                ],
                TableValues:[]

            }
        },
        methods: {
            ClickSearch() {
                var Parameters = {};
                Parameters.stringRegex = this.stringRegex
                console.debug(Parameters)
                axios.post('http://traducir.netlify.com/api/home/query', Parameters)
                    .then(response => {
                        this.TableValues = response.data
                        return response
                    })
                    .catch(error => {
                        console.debug ( error.message)
                    })
                console.debug("test boton")
            }
        }
    }

</script>