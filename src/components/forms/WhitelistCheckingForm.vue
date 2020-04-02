<template>
  <v-form ref="registrationForm" @submit.prevent="checkUser" v-model="formValid">
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
      <v-btn color="primary" type="submit" :loading="whitelistStatus.status === 'pending'">
            Vérifier votre mail
          </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WhitelistCheckingForm',

  data() {
    return {
      formValid: false,
      email: '',
      emailRules: [
        // eslint-disable-next-line max-len
        v => /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(v) || 'Addresse email invalide',
      ],
    };
  },

  computed: {
    ...mapGetters({
      whitelistStatus: 'getWhitelistStatus',
    }),
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
