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
                                                 :rows="3">
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
                                    <div v-if="this.searching===true">
                                        <i class="fa fa-cog fa-spin fa-fw"></i>
                                    </div>
                                    <div v-else>
                                        search...
                                    </div>
                                </b-button>
                            </b-col>
                        </b-row>

                    </b-container>
                </b-col>
            </b-row>
        </b-container>

        <b-table class="mt-3 mx-3"
                 striped hover :items="TableValues" :fields="TableFields">
            <template slot="reviewed" slot-scope="data" class="text-sm-center">
                <div v-if="data.item.reviewed">
                    <i class="fa fa-check" aria-hidden="true"></i>
                </div>
                <div v-else>
                    <i class="fa fa-ban" aria-hidden="true"></i>
                </div>
            </template>
            <template slot="translatedstring" slot-scope="data">
                <div v-if="data.item.translation != null">
                    {{data.item.translation.string}}
                    <br />
                    <!--
    <b-button size="sm">
        more info (in progress)
    </b-button>
        -->
                </div>
            </template>
            <template slot="suggestions" slot-scope="data">
                <div v-if="data.item.suggestions.length > 0">
                    {{data.item.suggestions.length}}
                    <!--<b-button size="sm">
            see suggestions (in progress)
        </b-button>
        -->
                </div>
                </template>
                <template slot="TransifexLink" slot-scope="data">
                    <b-button size="sm" :href="'https://www.transifex.com/stack-exchange/stack-overflow-es/translate/#es/english/'+data.item.id+'?key='+data.item.key.split('|')[0]" target="_blank">
                        see it on transifex
                    </b-button>
                </template>
                <template slot="show_details" slot-scope="row">
                    <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
                        {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                    </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                    <b-card v-if="row.item.translation != null"
                            title="Translation information">
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Last Updated:</b></b-col>
                            <b-col>{{ row.item.translation.lastUpdate }}</b-col>
                        </b-row>
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>User:</b></b-col>
                            <b-col>{{ row.item.translation.user }}</b-col>
                        </b-row>
                    </b-card>
                    <div v-if="row.item.suggestions.length > 0">
                        <b-card title="Suggestion information"
                                v-for="item in row.item.suggestions">
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Last Updated:</b></b-col>
                                <b-col>{{item.lastUpdate}}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Suggestion:</b></b-col>
                                <b-col>{{item.suggestion}}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>User:</b></b-col>
                                <b-col>{{item.username}}</b-col>
                            </b-row>                            
                        </b-card>
                    </div>
                    <b-card >

                    </b-card>
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
                    onlyTranslationsFromUsers: '',
                    onlySuggestionsFromUsers: '',
                    TableFields:
                    [
                        { key: "id", label: "Id" },
                        { key: "string", label: "String" },
                        { key: "reviewed", label: "Reviewed" },
                        { key: "comment", label: "Comment" },
                        { key: 'translatedstring', label: 'Translation' },
                        { key: 'suggestions', label: 'Quantity of suggestions' },
                        { key: 'TransifexLink', label: 'Transifex Link' },
                        { key:'show_details', labe: 'Show details'}

                    ],
                    TableValues: [],
                    searching : false

                }
            },
            methods: {
                ClickSearch() {
                    this.searching = true
                    var Parameters = {};
                    Parameters.stringRegex = this.stringRegex
                    Parameters.translationRegex = this.translationRegex
                    if (!(this.isReviewed === null)) {
                        Parameters.isReviewed = this.isReviewed
                    }
                    if (!(this.withNonReviewedSuggestions === null)) {
                        Parameters.withNonReviewedSuggestions = this.withNonReviewedSuggestions
                    }
                    if (this.onlyTranslationsFromUsers.trim().length > 0) {
                        var v = this.onlyTranslationsFromUsers.trim().split("\n")
                        Parameters.onlyTranslationsFromUsers = v
                    }
                    if (this.onlySuggestionsFromUsers.trim().length > 0) {
                        var v = this.onlySuggestionsFromUsers.trim().split("\n")
                        Parameters.onlySuggestionsFromUsers = v
                    }
                    console.debug(Parameters)
                    axios.post('https://traducir.netlify.com/api/home/query', Parameters)
                        .then(response => {
                            this.TableValues = response.data
                            this.searching = false
                            return response
                        })
                        .catch(error => {
                            console.debug(error.message)
                            this.searching = false
                        })
                }
            }
        }

    </script>
