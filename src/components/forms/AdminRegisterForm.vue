<template>
  <v-form ref="registrationForm" @submit.prevent="handleFormSubmission" v-model="formValid">
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            type="email"
            v-model="email"
            label="Adresse e-mail"
            required
            prepend-inner-icon="email"
            readonly
            autofocus
            color="success"
            outlined/>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
            type="password"
            v-model="password"
            label="Mot de passe"
            :rules="passwordRules"
            validate-on-blur
            required
            prepend-inner-icon="lock"
            outlined/>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
            type="password"
            v-model="confirmPassword"
            label="Confirmation du mot de passe"
            :rules="confirmPasswordRules"
            validate-on-blur
            required
            prepend-inner-icon="vpn_key"
            outlined/>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8" offset="2">
          <v-btn color="primary" type="submit" block>
            Créer un compte
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'AdminRegisterForm',

  props: [
    'email',
  ],

  data() {
    return {
      formValid: false,
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => /.{8,}/.test(v) || 'Le mot de passe doit contenir au moins 8 caractères',
        v => /[a-z]/.test(v) || 'Le mot de passe doit contenir au moins une lettre minuscule',
        v => /[A-Z]/.test(v) || 'Le mot de passe doit contenir au moins une lettre majuscule',
        v => /\d/.test(v) || 'Le mot de passe doit contenir au moins un chiffre',
        v => /[^a-zA-Z0-9]/.test(v) || 'Le mot de passe doit contenir au moins un caractère spécial',
      ],
      confirmPasswordRules: [
        v => v === this.password || 'Les mots de passe doivent correspondre',
      ],
    };
  },

  methods: {
    handleFormSubmission() {
      if (this.formValid) {
        this.$emit('submit', {
          email: this.email,
          password: this.password,
          additionalData: {},
        });

        this.$refs.registrationForm.reset();
      }
    },
  },
};
</script>
