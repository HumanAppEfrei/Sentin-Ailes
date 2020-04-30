<template>
  <v-container>
    <LoginForm />

    <div class="mt-5">
      <p>
        Vous n'avez pas encore de compte ?
      </p>

      <v-btn color="warning" to="/register" class="">
        Créer un compte
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>
