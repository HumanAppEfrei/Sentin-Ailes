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

        <v-col>
          <v-menu
            v-model="birthDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="birthDate"
                label="Date de naissance"
                prepend-inner-icon="cake"
                readonly
                v-on="on"
                outlined
              />
            </template>
            <v-date-picker
              v-model="birthDate"
              @input="birthDateMenu = false"
              first-day-of-week="1"
              min="1900-01-01"
              locale="fr" />
          </v-menu>
        </v-col>

        <v-col cols="12" sm="6">
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

        <v-col cols="12" sm="6">
          <v-select
            v-model="familySituation"
            label="Situation familiale"
            :items="familySituationOptions"
            item-text="text"
            item-value="value"
            prepend-inner-icon="people_outline"
            required
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

      <h2>Adresse</h2>
      <v-row>
        <v-col cols="12" sm="5">
          <v-text-field
            type="text"
            v-model="address"
            label="Rue"
            required
            prepend-inner-icon="place"
            outlined/>
        </v-col>
        <v-col cols="5" sm="3">
          <v-text-field
          type="number"
          v-model="postalCode"
          label="Code postal"
          prepend-inner-icon="map"
          required
          outlined/>
        </v-col>
        <v-col cols="7" sm="4">
          <v-text-field
            type="text"
            v-model="city"
            label="Ville"
            required
            prepend-inner-icon="location_city"
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
import { Timestamp } from '@/firebaseConfig';

export default {
  name: 'BeneficiaireRegisterForm',

  props: [
    'email',
  ],

  data() {
    return {
      formValid: false,
      firstName: '',
      lastName: '',
      birthDate: '',
      birthDateMenu: '',
      phone: '',
      familySituation: '',
      password: '',
      confirmPassword: '',
      address: '',
      postalCode: '',
      city: '',
      familySituationOptions: [
        { text: 'Célibataire', value: 'single' },
        { text: 'Marié(e)', value: 'married' },
        { text: 'En concubinage', value: 'cohabitation' },
      ],
      nameRules: [
        v => !(/\d/.test(v)) || 'Ne doit pas contenir de chiffres',
        v => !(/[@#&"(§!)°®†Úºîπ‡Ò∂ƒﬁ¬µ‹≈©◊ß~<>$*€`£ù%+=:/;.,?]/.test(v))
         || 'Ne doit pas contenir de caractères spéciaux',
      ],
      phoneRules: [
        v => /^((\+)33|0)[1-9](\d{2}){4}$/.test(v) || 'Numéro de téléphone invalide',
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
            birthDate: Timestamp.fromDate(new Date(this.birthDate)),
            famSituation: this.familySituation,
            address: `${this.address}, ${this.postalCode}, ${this.city}`,
          },
        });

        this.$refs.registrationForm.reset();
      }
    },
  },
};
</script>
