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
                                <b-form-textarea id="textarea1"
                                                 v-model="onlyTranslationsFromUsers"
                                                 placeholder="Insert user names. one per row."
                                                 :rows="3"
                                                 >
                                </b-form-textarea>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1">
                            <b-col>Only include suggestions made by the following users</b-col>
                            <b-col>
                                <b-form-textarea id="textarea1"
                                                 v-model="onlySuggestionsFromUsers"
                                                 placeholder="Insert user names. one per row."
                                                 :rows="3">
                                </b-form-textarea>
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
                 striped hover :items="TableValues" :fields="TableFields">
            <template slot="translatedstring" slot-scope="data">
                <div v-if="data.item.translation != null">
                    {{data.item.translation.string}}
                    <br />
                    <b-button>
                        more info (in progress)
                    </b-button>
                </div>
            </template>
            <template slot="suggestions" slot-scope="data">
                <div v-if="data.item.suggestions.length > 0">
                    <!--{{data.item.suggestions.length}}-->
                    <b-button>
                        see suggestions (in progress)
                    </b-button>
                </div>
            </template>
            <template slot="TransifexLink" slot-scope="data">
                <b-button>
                    link (in progress)
                </b-button>
            </template>

        </b-table>

    </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: 'parametros',
        data() {
            return {
                comboOptions: [
                    { value: null, text: 'Please select an option' },
                    { value: true, text: 'YES' },
                    { value: false, text: 'NO' },
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
                    { key: 'translatedstring', label: 'Translation' },
                    { key: 'suggestions', label: 'Suggestions' },
                    { key: 'TransifexLink', label: 'Transifex Link' }
                    
                ],
                TableValues:[]

            }
        },
        methods: {
            ClickSearch() {
                var Parameters = {};
                Parameters.stringRegex = this.stringRegex
                Parameters.translationRegex = this.translationRegex
                if (!(this.isReviewed === null)) {
                    Parameters.isReviewed = this.isReviewed 
                }
                if (!(this.withNonReviewedSuggestions === null)) {
                    Parameters.withNonReviewedSuggestions = this.withNonReviewedSuggestions
                }
                if (this.onlySuggestionsFromUsers.trim().length > 0) {
                    var v = this.onlyTranslationsFromUsers.trim().split("\n")
                    Parameters.onlyTranslationsFromUsers = v
                }
                if (this.onlySuggestionsFromUsers.trim().length > 0) {
                    var v = this.onlyTranslationsFromUsers.trim().split("\n")
                    Parameters.onlyTranslationsFromUsers = v
                }
                console.debug(Parameters)
                axios.post('https://traducir.netlify.com/api/home/query', Parameters)
                    .then(response => {
                        this.TableValues = response.data
                        return response
                    })
                    .catch(error => {
                        console.debug ( error.message)
                    })
            }
        }
    }

</script>