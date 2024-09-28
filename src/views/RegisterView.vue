<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Formulário de Cadastro</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field name="email" label="Email" type="text" v-model="email"></v-text-field>
                                    <v-text-field id="password" name="senha" label="Senha" type="password"
                                        v-model="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="register()">Registrar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },

    methods: {
        async register() {
            try {
                const response = await axios.post('http://localhost:3000/token/register', {
                    email: this.email,
                    password: this.password
                });

                console.log('Registro realizado com sucesso!', response.data);
                this.$router.push('/');
            } catch (error) {
                console.error('Erro durante o registro:', error.response?.data?.message || error.message);
            }
        }
    }
};
</script>
