<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md8>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Gerenciamento de Categorias</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form @submit.prevent="salvarCategoria" v-if="admin">
                                    <v-text-field label="Nome da Categoria"
                                        v-model="categoria.nome_categoria"></v-text-field>
                                    <v-btn color="primary" @click="salvarCategoria">
                                        Salvar Categoria
                                    </v-btn>
                                </v-form>
                                <v-divider class="my-4"></v-divider>
                                <v-list>
                                    <v-list-item v-for="cat in categorias" :key="cat.id_categoria"
                                        @click="editarCategoria(cat)">
                                        <v-list-item-content>
                                            <v-list-item-title>{{ cat.nome_categoria }}</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn icon @click="deletarCategoria(cat.id_categoria)" v-if="admin">
                                                <v-icon color="red">mdi-delete</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import api from '@/services/api';
import store from "@/store";

export default {
    data() {
        return {
            categoria: {
                nome_categoria: '',
                id_categoria: null,
            },
            categorias: [],
            admin: false
        };
    },
    methods: {
        async carregarCategorias() {
            try {
                const response = await api.get('/categoria', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.categorias = response.data;
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        },

        async salvarCategoria() {
            try {
                if (this.categoria.id_categoria) {
                    await api.put(`/categoria/${this.categoria.id_categoria}`, this.categoria, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                } else {
                    await api.post('/categoria', this.categoria, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                this.carregarCategorias();
                this.resetarFormulario();
            } catch (error) {
                console.error('Erro ao salvar categoria:', error);
            }
        },

        async deletarCategoria(id_categoria) {
            try {
                await api.delete(`/categoria/${id_categoria}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.carregarCategorias();
                this.resetarFormulario();
            } catch (error) {
                console.error('Erro ao deletar categoria:', error);
            }
        },
        resetarFormulario() {
            this.categoria = {
                nome_categoria: '',
                id_categoria: null,
            };
        },
    },
    mounted() {
        this.carregarCategorias();
        this.admin = store.getters.isAdmin
    },
};
</script>
