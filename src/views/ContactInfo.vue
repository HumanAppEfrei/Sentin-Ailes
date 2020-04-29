<template>
<main>
  <v-form>
    <v-row>
        <h1>Informations personnelles</h1>
    </v-row>
    <h2>Identitée</h2>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field outlined
            type="text"
            label="Prénon"
            v-model="this.user.firstName"
            :readonly="!editMode"
            prepend-inner-icon="person"/>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field outlined
            type="text"
            label="Nom"
            v-model="this.user.lastName"
            :readonly="!editMode"
            prepend-inner-icon="person"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-menu
          v-model="birthDateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
          :disabled="!editMode">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="birthDate"
              label="Date de naissance"
              prepend-inner-icon="cake"
              readonly
              v-on="on"
              outlined />
          </template>
          <v-date-picker v-model="birthDate"
            first-day-of-week="1"
            min="1900-01-01"
            @input="birthDateMenu = false"
            locale="fr">
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="this.user.famSituation"
          label="Situation familiale"
          :items="familySituationOptions"
          item-text="text"
          item-value="value"
          prepend-inner-icon="people_outline"
          :readonly="!editMode"
          outlined/>
    </v-col>
    </v-row>
    <h2>Contact</h2>
    <v-row>
      <v-col>
        <v-text-field outlined
          type="text"
          label="Adresse"
          v-model="this.user.address"
          :readonly="!editMode"
          prepend-inner-icon="place"
            />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="8">
        <v-text-field outlined
          type="text"
          label="Ville"
          v-model="city"
          :readonly="!editMode"
          prepend-inner-icon="location_city" />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field outlined
          type="text"
          label="Code postal"
          v-model="postalCode"
          :readonly="!editMode"
          prepend-inner-icon="map" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="8">
        <v-text-field outlined
        type="email"
        label="Email"
        v-model="email"
        :readonly="!editMode"
        prepend-inner-icon="email" />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field outlined
        type="phone"
        label="Téléphone"
        v-model="this.user.phone"
        :readonly="!editMode"
        prepend-inner-icon="phone" />
      </v-col>
    </v-row>
    <v-row>
      <h1>Contacts d'urgences</h1>
    </v-row>
    <emergency-contact
      v-for="contact in emergencyContacts"
      :key="contact.number"
      :contact="contact"
      :edit-mode="editMode"
      @delete="onDeleteContact">
    </emergency-contact>
    <v-row justify="center">
      <v-btn v-if="editMode" @click="onAddContact">Ajouter un contact</v-btn>
    </v-row>
  </v-form>
  <div class="floating" v-if="!editMode">
  <v-btn fab large @click="onEdit">
    <v-icon>edit</v-icon>
  </v-btn>
  </div>
  <v-row class="floating" v-else>
    <v-btn class="btn-pair" fab large color="primary" @click="onSave">
      <v-icon>save_alt</v-icon>
    </v-btn>
    <v-btn class="btn-pair" fab large color="error" @click="onCancel">
      <v-icon>cancel</v-icon>
    </v-btn>
  </v-row>
</main>
</template>

<script>
import EmergencyContact from '@/components/EmergencyContact.vue';

import { usersCollection } from '@/firebaseConfig';

const contact1 = {
  number: 1,
  firstname: 'Jean',
  lastname: 'Paul',
  phone: '0102030405',
  email: 'jean.paul@www.zzz',
};

export default {
  name: 'contact-info',
  components: {
    EmergencyContact,
  },

  data() {
    return {
      user: {},
      email: '',
      date: '',
      editMode: false,
      birthDateMenu: '',
      birthDate: '',

      address: '',
      postalCode: '',
      city: '',

      emergencyContacts: [contact1],
      familySituationOptions: [
        { text: 'Célibataire', value: 'single' },
        { text: 'Marié(e)', value: 'married' },
        { text: 'En concubinage', value: 'cohabitation' },
      ],
    };
  },

  methods: {
    onEdit() {
      this.editMode = true;
    },

    onSave() {
      /* Update user in vuex store */
      this.editMode = false;
    },

    onCancel() {
      /* Reload User data From vuex store */
      this.editMode = false;
    },

    onAddContact() {
      this.emergencyContacts.push(
        {
          number: this.emergencyContacts.length + 1,
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
        },
      );
    },

    onDeleteContact(number) {
      const array = this.emergencyContacts;
      array.splice(number - 1, 1);
      for (let i = number - 1; i < array.length; i += 1) {
        array[i].number -= 1;
      }
    },
  },

  async mounted() {
    let uid;
    if (this.$route.params.id === undefined) {
      // eslint-disable-next-line prefer-destructuring
      uid = this.$store.getters['auth/user'].uid;
    } else {
      uid = this.$route.params.id;
    }

    const firebaseUser = await usersCollection.doc(uid).get();
    this.user = firebaseUser.data();

    this.email = this.$store.getters['auth/user'].email;
    this.birthDate = this.user.birthDate.toDate();
    // parse user address
    const parsedAdress = this.user.address.split(',');
    // eslint-disable-next-line prefer-destructuring
    this.address = parsedAdress[0];
    // eslint-disable-next-line prefer-destructuring
    this.postalCode = parsedAdress[1];
    // eslint-disable-next-line prefer-destructuring
    this.city = parsedAdress[2];
  },
};
</script>

<style scoped>

main {
  padding: 2% 15%;
}

.floating {
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  right: 5%;
  bottom: 5%;
}

.btn-pair {
  margin: 5px;
}

@media screen and (max-width: 600px){
  main {
    padding: 5%;
  }
}
</style>
