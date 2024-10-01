<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field label="E-mail" name="email" prepend-icon="mdi-account"
                                        type="email"></v-text-field>
                                    <v-text-field label="Senha" name="password" prepend-icon="mdi-lock"
                                        type="password"></v-text-field>
                                    <v-btn color="primary" block>Login</v-btn>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer> <!-- Empurra o botão para a direita -->
                                <v-btn text @click="$router.push('/register')">
                                    Ir para cadastro
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import api from '@/services/api';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },

    methods: {
        async logar() {
            try {
                const response = await api.post('/login', {
                    email: this.email,
                    password: this.password
                });

                localStorage.setItem('token', response.data.token);
                this.$store.commit('setToken', response.data.token);
                this.$store.commit('setUser', response.data.user);

                console.log('Login bem-sucedido, redirecionando para /categorias');
                this.$router.push('/categorias');
            } catch (error) {
                console.error('Erro durante o login:', error);
            }
        }
    }
};
</script>
