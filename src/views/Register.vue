<template>
  <v-stepper v-model="e1" vertical class="elevation-0">
    <v-container>
      <v-stepper-step
        :complete="whitelistStatus.status === 'found'"
        step="1"
        :rules="[() => whitelistStatus.type != 'error' ? true : false]">
          Vérification de l'email
      </v-stepper-step>
      <v-stepper-content step="1">
        <WhitelistCheckingForm @submit="passEmail"/>
      </v-stepper-content>

      <v-stepper-step :complete="e1 > 2" step="2">Inscription</v-stepper-step>
      <v-stepper-content step="2">
        <IntervenantRegisterForm v-if="whitelistStatus.type === 'intervenant'" @submit="registerUser" :email="this.email"/>
        <BeneficiaireRegisterForm v-if="whitelistStatus.type === 'beneficiaire'" @submit="registerUser" :email="this.email"/>
        <AdminRegisterForm v-if="['admin', 'superAdmin'].includes(whitelistStatus.type)" @submit="registerUser" :email="this.email" />
      </v-stepper-content>
    </v-container>
  </v-stepper>
</template>

<script>
import BeneficiaireRegisterForm from '@/components/forms/BeneficiaireRegisterForm.vue';
import IntervenantRegisterForm from '@/components/forms/IntervenantRegisterForm.vue';
import AdminRegisterForm from '@/components/forms/AdminRegisterForm.vue';
import WhitelistCheckingForm from '@/components/forms/WhitelistCheckingForm.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'RegisterView',
  components: {
    BeneficiaireRegisterForm,
    IntervenantRegisterForm,
    WhitelistCheckingForm,
    AdminRegisterForm,
  },

  methods: {
    registerUser(formData) {
      this.$store.dispatch('auth/registerWithEmailAndPassword', formData);
    },

    passEmail(formData) {
      this.email = formData.email;
    },
  },

  computed: {
    ...mapGetters({
      whitelistStatus: 'whitelist/getWhitelistStatus',
    }),
  },

  watch: {
    whitelistStatus(newStatus) {
      if (newStatus.status === 'found') {
        this.e1 = 2;
      }
    },
  },

  data() {
    return {
      e1: 1,
      email: '',
    };
  },
};
</script>
