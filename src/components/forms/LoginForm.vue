<template>
  <div>
    <p v-show="loginStatus === 'failure'" class="error--text font-weight-black">
      Une erreur est survenue pendant la connexion, verrifiez le mot de passe ou l'email
    </p>
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
              placeholder="Mot de passe"/>

      <v-btn
        type="submit"
        color="primary"
        :loading="loginStatus === 'pending'">
        Connexion
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters({
      loginStatus: 'auth/loginStatus',
    }),
  },
  methods: {
    async submitForm() {
      this.$store.dispatch('auth/loginWithEmailAndPassword', { email: this.email, password: this.password });

      this.email = '';
      this.password = '';
    },
  },
};
</script>
