<template>
  <div>
    <h1>Lier des utilisateurs</h1>

    <v-stepper v-model="currentStep" vertical class="mt-5">
      <v-stepper-step step="1">
        <h3>Choix du bénéficiaire à lier</h3>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-container>
          <v-form ref="benefForm" v-model="validBenef" @submit.prevent="validateBenef" class="my-5">
            <h2>Prénom du bénéficiaire à lier</h2>
            <v-text-field
              v-model="benefFirstName"
              :rules="[rules.nonEmpty]"
              placeholder="Jean"
              hint="Prénom du bénéficiaire"
              outlined
              validate-on-blur />

            <h2>Nom de famille du bénéficiaire à lier</h2>
            <v-text-field
              v-model="benefLastName"
              :rules="[rules.nonEmpty]"
              placeholder="Dupont"
              hint="Nom de famille du bénéficiaire"
              outlined
              validate-on-blur />

            <v-btn type="submit" color="primary" :disabled="!benefFirstName || !benefLastName" class="mt-7">
              Continuer
            </v-btn>
          </v-form>
        </v-container>
      </v-stepper-content>

      <v-stepper-step step="2">
        <h3 v-show="potentialBenefs.length >= 2">Plusieurs bénéficiaires trouvés, sélectionner le bénéficiaire à lier</h3>
      </v-stepper-step>

      <v-stepper-content step="2">
        <h2>Test</h2>
      </v-stepper-content>

      <v-stepper-step step="3">
        <h3>Choix de l'intervenant à lier à ce bénéficiaire</h3>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-form v-model="validInterv" @submit.prevent class="my-5">
          <v-text-field type="email" v-model="intervEmail" outlined placeholder="intervenant@mail.com" />

          <v-btn type="submit" color="primary">
            Valider et lier les utilisateurs
          </v-btn>
        </v-form>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import { usersCollection } from '@/firebaseConfig';

export default {
  name: 'LinkUsers',

  data() {
    return {
      currentStep: 1,
      benefLastName: '',
      benefFirstName: '',
      intervEmail: '',
      validBenef: false,
      validInterv: false,
      rules: {
        nonEmpty: value => !!value || 'Doit être renseigné',
      },
      potentialBenefs: [],
      potentialInterv: [],
      benefRef: null,
      intervRef: null,
    };
  },

  methods: {
    async validateBenef() {
      if (this.validBenef) {
        // Get potential users from database
        const potentialBenefsRefs = await usersCollection
          .where('type', '==', 'beneficiaire')
          .where('firstName', '==', this.benefFirstName)
          .where('lastName', '==', this.benefLastName)
          .get();

        if (potentialBenefsRefs.docs.length === 1) {
          this.benefRef = potentialBenefsRefs.docs[1].ref;
          this.currentStep = 3;
        } else {
          // Filter only essential data
          this.potentialBenefs = potentialBenefsRefs.docs
            .map(snap => ({ ...snap.data(), ref: snap.ref }))
            .map(userData => ({
              birthDate: userData.birthDate.seconds * 1000,
              ...userData,
            }));

          // Process to right stepper step
          if (this.potentialBenefs.length === 0) {
            this.$refs.benefForm.reset();
          } else { // Means at least 2 users matching criterions were found
            this.currentStep = 2;
          }
        }
      }
    },
  },
};
</script>

<style>

</style>
