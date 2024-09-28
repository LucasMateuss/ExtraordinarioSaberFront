<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
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
                                <v-btn color="primary" @click="logar()">Login</v-btn>
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
        }; // <-- Esta linha está correta, termina o objeto `return`
    }, // <-- Certifique-se de que há uma vírgula aqui se houver métodos ou propriedades adicionais

    methods: {
        async logar() { // <-- Certifique-se de que a palavra-chave `async` é usada corretamente
            try {
                const response = await api.post('/login', {
                    email: this.email,
                    password: this.password
                });

                localStorage.setItem('token', response.data.token);
                this.$store.commit('setToken', response.data.token);
                this.$store.commit('setUser', response.data.user);

                console.log('Login successful, redirecting to /categorias');
                this.$router.push('/categorias');
            } catch (error) {
                console.error('Erro durante o login:', error);
            }
        }
    } // Certifique-se de que não há vírgula extra aqui se este for o final do objeto `export default`
};

</script>
