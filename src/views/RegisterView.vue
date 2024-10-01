<template>
    <!-- Layout similar ao da tela de login -->
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
                                    <v-text-field label="E-mail" name="email" prepend-icon="mdi-account"
                                        type="email"></v-text-field>
                                    <v-text-field label="Senha" name="password" prepend-icon="mdi-lock"
                                        type="password"></v-text-field>
                                    <v-text-field label="Confirme sua senha" name="confirmPassword"
                                        prepend-icon="mdi-lock" type="password"></v-text-field>
                                    <v-btn color="primary" block>Cadastrar</v-btn>
                                </v-form>
                            </v-card-text>
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
                const response = await axios.post('/token/register', {
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
