<template>
  <v-form ref="registrationForm" @submit.prevent="checkUser" v-model="formValid">
    <v-container>
      <h2>Informations de connexion</h2>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            type="email"
            v-model="email"
            label="Adresse e-mail"
            :rules="emailRules"
            required
            prepend-inner-icon="email"
            outlined/>
        </v-col>
      </v-row>
      <v-btn color="primary" type="submit" :loading="checkingMail">
            Vérifier votre mail
          </v-btn>
    </v-container>
  </v-form>
</template>

<script>

export default {
  name: 'WhitelistCheckingForm',

  data() {
    return {
      formValid: false,
      checkingMail: false,
      email: '',
      emailRules: [
        // eslint-disable-next-line max-len
        v => /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(v) || 'Addresse email invalide',
      ],
    };
  },

  methods: {
    checkUser() {
      if (this.formValid) {
        this.$emit('submit', {
          email: this.email,
        });

        this.$store.dispatch('checkEmailInWhitelist', {
          email: this.email,
        });

        this.$refs.registrationForm.reset();
      }
    },
  },
};
</script>
