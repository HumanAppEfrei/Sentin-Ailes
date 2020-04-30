<template>
  <v-form ref="registrationForm" @submit.prevent="registerUser" v-model="formValid">
    <v-container>
      <h2>Identité</h2>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            type="text"
            v-model="firstName"
            label="Prénom"
            :rules="nameRules"
            validate-on-blur
            required
            prepend-inner-icon="person"
            outlined/>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            type="text"
            v-model="lastName"
            label="Nom"
            :rules="nameRules"
            validate-on-blur
            required
            prepend-inner-icon="person"
            outlined/>
        </v-col>

        <v-col cols="12" sm="6" offset-sm="3">
          <v-text-field
            type="phone"
            v-model="phone"
            label="Téléphone"
            :rules="phoneRules"
            validate-on-blur
            required
            prepend-inner-icon="phone"
            outlined/>
        </v-col>
      </v-row>

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
  name: 'IntervenantRegisterForm',

  props: [
    'email',
  ],

  data() {
    return {
      formValid: false,
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      confirmPassword: '',
      nameRules: [
        v => !(/\d/.test(v)) || 'Ne doit pas contenir de chiffres',
        v => !(/[@#&"(§!)°®†Úºîπ‡Ò∂ƒﬁ¬µ‹≈©◊ß~<>$*€`£ù%+=:/;.,?]/.test(v)) || 'Ne doit pas contenir de caractères spéciaux',
      ],
      phoneRules: [
        v => /^((\+)33|0)[1-9](\d{2}){4}$/.test(v) || 'Numéro de téléphone invalide',
      ],
      emailRules: [
        // eslint-disable-next-line max-len
        v => /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(v) || 'Addresse email invalide',
      ],
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
    registerUser() {
      if (this.formValid) {
        this.$emit('submit', {
          email: this.email,
          password: this.password,
          additionalData: {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
          },
        });

        this.$refs.registrationForm.reset();
      }
    },
  },
};
</script>
