<template>
  <div>
    <h1>Lier des utilisateurs</h1>

    <v-stepper v-model="currentStep" vertical class="mt-5">
      <v-stepper-step step="1">
        <h3>Choix du bénéficiaire à lier</h3>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-container>
          <v-form ref="benefForm" @submit.prevent="validateBenef" class="my-5">
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
        <h3 class="subtitle-2">Sélection du bénéficiaire</h3>
        <small>
          Nécessaire seulement si plusieurs bénéficiaires sont trouvés
        </small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-data-table
          :headers="benefTableHeaders"
          :items="potentialBenefs"
          disable-sort
          hide-default-footer
          :items-per-page="100"
        >
          <template v-slot:item.btn="{ item }">
            <v-btn color="primary" @click="selectBenef(item)">
              Sélectionner
            </v-btn>
          </template>
        </v-data-table>
      </v-stepper-content>

      <v-stepper-step step="3">
        <h3>Choix de l'intervenant à lier à ce bénéficiaire</h3>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-form ref="intervForm" @submit.prevent="validateInterv" class="my-5">
          <h2>Prénom de l'intervenant à lier</h2>
          <v-text-field
              v-model="intervFirstName"
              :rules="[rules.nonEmpty]"
              placeholder="Jean"
              hint="Nom de famille de l'intervenant"
              outlined
              validate-on-blur />

          <h2>Nom de famille de l'intervenant à lier</h2>
          <v-text-field
              v-model="intervLastName"
              :rules="[rules.nonEmpty]"
              placeholder="Dupont"
              hint="Nom de famille de l'intervenant"
              outlined
              validate-on-blur />

          <v-btn type="submit" color="primary">
            Valider et lier les utilisateurs
          </v-btn>
        </v-form>
      </v-stepper-content>

      <v-stepper-step step="4">
        <h3 class="subtitle-2">Sélection de l'intervenant à lier</h3>
        <small>Nécessaire seulement si plusieurs intervenants sont trouvés</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <v-data-table
          :headers="intervTableHeaders"
          :items="potentialIntervs"
          disable-sort
          hide-default-footer
          :items-per-page="100"
        >
          <template v-slot:item.btn="{ item }">
            <v-btn color="primary" @click="selectInterv(item)">
              Sélectionner et lier
            </v-btn>
          </template>
        </v-data-table>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import { usersCollection, FieldValue } from '@/firebaseConfig';

export default {
  name: 'LinkUsers',

  data() {
    return {
      currentStep: 1,
      benefLastName: '',
      benefFirstName: '',
      intervFirstName: '',
      intervLastName: '',
      rules: {
        nonEmpty: value => !!value || 'Doit être renseigné',
      },
      potentialBenefs: [],
      potentialIntervs: [],
      benefRef: null,
      intervUID: null,
      benefTableHeaders: [
        {
          text: 'Prénom',
          value: 'firstName',
        },
        {
          text: 'Nom',
          value: 'lastName',
        },
        {
          text: 'Téléphone',
          value: 'phone',
        },
        {
          text: 'Addresse',
          value: 'address',
        },
        {
          text: '',
          value: 'btn',
          align: 'center',
        },
      ],
      intervTableHeaders: [
        {
          text: 'Prénom',
          value: 'firstName',
        },
        {
          text: 'Nom',
          value: 'lastName',
        },
        {
          text: 'Téléphone',
          value: 'phone',
        },
        {
          text: '',
          value: 'btn',
          align: 'center',
        },
      ],
    };
  },

  methods: {
    async validateBenef() {
      if (this.benefFirstName && this.benefLastName) {
        // Get potential users from database
        const potentialBenefsRefs = await usersCollection
          .where('type', '==', 'beneficiaire')
          .where('firstName', '==', this.benefFirstName)
          .where('lastName', '==', this.benefLastName)
          .get();

        if (potentialBenefsRefs.docs.length === 1) {
          this.benefRef = potentialBenefsRefs.docs[0].ref;
          this.currentStep = 3;
        } else {
          // Filter only essential data
          this.potentialBenefs = potentialBenefsRefs.docs
            .map(snap => ({ ...snap.data(), ref: snap.ref, uid: snap.id }))
            .map(userData => ({
              birthDate: userData.birthDate.seconds * 1000,
              ...userData,
            }));

          // Process to right stepper step
          if (this.potentialBenefs.length === 0) {
            this.$swal({
              icon: 'error',
              title: 'Pas de bénéficiaire trouvé',
            });
          } else { // Means at least 2 users matching criterions were found
            this.currentStep = 2;
          }
        }

        this.$refs.benefForm.reset();
      }
    },

    async validateInterv() {
      if (this.intervFirstName && this.intervLastName) {
        // Get potential users from database
        const potentialIntervsRefs = await usersCollection
          .where('type', '==', 'intervenant')
          .where('firstName', '==', this.intervFirstName)
          .where('lastName', '==', this.intervLastName)
          .get();

        if (potentialIntervsRefs.docs.length === 1) {
          this.intervUID = potentialIntervsRefs.docs[0].id;
          await this.linkUsers();
          this.currentStep = 1;
        } else {
          // Filter only essential data
          this.potentialIntervs = potentialIntervsRefs.docs
            .map(snap => ({ ...snap.data(), ref: snap.ref, id: snap.id }));

          // Process to right stepper step
          if (this.potentialIntervs.length === 0) {
            this.$swal({
              icon: 'error',
              titleText: 'Pas d\'intervenant trouvé',
            });
          } else { // Means at least 2 users matching criterions were found
            this.currentStep = 4;
          }
        }

        this.$refs.intervForm.reset();
      }
    },

    selectBenef(item) {
      this.benefRef = item.ref;
      this.currentStep = 3;
    },

    selectInterv(item) {
      this.intervUID = item.id;
      this.linkUsers();
    },

    async linkUsers() {
      try {
        // Actually add the intervenant UID to the array of people allowed to access a beneficiaire
        await this.benefRef.update({
          people: FieldValue.arrayUnion(this.intervUID),
        });

        this.$swal({
          icon: 'success',
          titleText: 'Bénéficiaire et Intervenant liés !',
        });
      } catch (e) {
        this.$swal({
          icon: 'error',
          titleText: 'Une erreur s\'est produite pendant l\'enregistrement, merci de réessayer',
        });
      } finally {
        this.$refs.benefForm.reset();
        this.$refs.intervForm.reset();
        this.currentStep = 1;
      }
    },
  },
};
</script>
