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

    <v-alert type="error" class="mt-4" outlined v-show="$store.state.loginStatus === 'failure'">
      {{ $store.state.loginError }}
    </v-alert>

    <v-alert type="success" class="mt-4" v-show="!$store.state.loginError && $store.state.user">
      {{ $store.state.user }}
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submitForm() {
      this.$store.dispatch('loginWithEmailAndPassword', { email: this.email, password: this.password });

      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style>

</style>
