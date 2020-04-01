<template>
  <v-stepper v-model="e1" vertical>
    <v-stepper-step :complete="e1 > 1" step="1">Type d'inscription</v-stepper-step>
    <v-stepper-content step="1">
      <!-- TODO: make the beneficiaire/intervenant(/admin?) form -->
      <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e1 > 2" step="2">Inscription</v-stepper-step>
    <v-stepper-content step="2">
      <BeneficiaireRegisterForm v-if="formType === 'beneficiaire'"/>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import BeneficiaireRegisterForm from '@/components/forms/BeneficiaireRegisterForm.vue';

export default {
  name: 'RegisterView',
  components: {
    BeneficiaireRegisterForm,
  },

  methods: {
  },

  data() {
    return {
      e1: 1,
      formType: 'beneficiaire',
    };
  },
};
</script>
