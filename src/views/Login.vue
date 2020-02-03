<template>
  <form method="POST" action="#" @submit.prevent="submitForm">
    <label for="login-email-input">Adresse e-mail:</label>
    <input  type="email"
            v-model="email"
            name="email"
            id="login-email-input"
            placeholder="Email" />

    <label for="login-password-input">Mot de passe</label>
    <input  type="password"
            v-model="password"
            name="password"
            id="login-password-input"
            placeholder="Mot de passe" />

    <input type="submit" value="Connexion" />
  </form>
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
    submitForm() {
      console.log(`Handling connection for email "${this.email}" and password "${this.password}"`);
    },
  },
};
</script>

<style>

</style>
