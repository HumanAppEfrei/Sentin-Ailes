<template>
  <div>
    <form @submit.prevent="submitForm" ref="loginForm">
      <v-text-field outlined
              type="email"
              v-model="email"
              name="email"
              placeholder="Email" />

      <v-text-field outlined
              type="password"
              v-model="password"
              name="password"
              placeholder="Mot de passe" />

      <v-btn
        type="submit"
        color="primary"
      >Connexion
      </v-btn>
    </form>

    <v-alert type="error" class="mt-4" outlined v-show="loginError">
      {{ loginError }}
    </v-alert>

    <v-alert type="success" class="mt-4" v-show="!loginError && loginData">
      {{ JSON.stringify(loginData) }}
    </v-alert>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: '',
      loginData: null,
    };
  },
  methods: {
    async submitForm() {
      console.log(`Handling connection for email "${this.email}" and password "${this.password}"`);
      this.$refs.loginForm.reset();
      try {
        this.loginData = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        // TODO: redirect users to their dashboard
      } catch (err) {
        this.loginError = err.message;
      }
    },
  },
};
</script>

<style>

</style>
