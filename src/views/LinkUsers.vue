<template>
  <div>
    <h1>Lier des utilisateurs</h1>

    <v-stepper v-model="currentStep" vertical class="mt-5">
      <v-stepper-step step="1">
        <h3>Choix du bénéficiaire à lier</h3>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-container>
          <v-form v-model="validBenef" @submit.prevent="validateBenef" class="my-5">
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
        <h3>Choix de l'intervenant à lier à ce bénéficiaire</h3>
      </v-stepper-step>

      <v-stepper-content step="2">
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

        //
        this.potentialBenefs = potentialBenefsRefs.docs
          .map(ref => ref.data())
          .map(userData => ({
            address: userData.address,
            birthDate: userData.birthDate.seconds * 1000,
            phone: userData.phone,
            firstName: userData.firstName,
            lastName: userData.lastName,
          }));

        if (this.potentialBenefs.length !== 0) {
          this.currentStep = 2;
        } else {
          // TODO: notify the user
        }
      }
    },


  },
};
</script>

<style>

</style>
