<template>
  <form>
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
      color="primary"
      @click="submitForm"
    >Connexion
    </v-btn>
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
