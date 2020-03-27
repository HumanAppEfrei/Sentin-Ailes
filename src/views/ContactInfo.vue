<template>
<v-form>
  <v-container >
      <v-row>
        <v-col cols=12 sm=10>
          <h1>Informations personnelles</h1>
        </v-col>
        <v-col cols="1" order="-1" order-sm="1">
          <v-btn>Modifier</v-btn>
        </v-col>
      </v-row>
      <h2>Identitée</h2>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field outlined
              type="text"
              label="Prénon"
              v-model="firstName"
              :readonly="!editMode"
              prepend-inner-icon="person"/>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field outlined
              type="text"
              label="Nom"
              v-model="lastName"
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
            <v-date-picker v-model="birthDate" first-day-of-week="1" min="1900-01-01" @input="birthDateMenu = false" locale="fr"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="familySituation"
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
            v-model="address"
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
          prepend-inner-icon="email"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field outlined
          type="phone"
          label="Téléphone"
          v-model="phone"
          :readonly="!editMode"
          prepend-inner-icon="phone"
          />
        </v-col>
      </v-row>
      <h1>Contacts d'urgence</h1>
  </v-container>
</v-form>
</template>

<script>
export default {
  name: 'contact-info',
  data() {
    return {
      editMode: false,
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jhon.doe@xxx.yy',
      birthDate: '2020-03-15',
      birthDateMenu: '',
      phone: '0123456789',
      familySituation: 'single',
      address: '1 rue de la paix',
      postalCode: '12345',
      city: 'Villejuif',
      familySituationOptions: [
        { text: 'Célibataire', value: 'single' },
        { text: 'Marié(e)', value: 'married' },
        { text: 'En concubinage', value: 'cohabitation' },
      ],
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
</style>
