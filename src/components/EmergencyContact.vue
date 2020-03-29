<template>
  <v-container>
    <v-row justify="space-between">
      <h2>Contact {{ contact.number }}</h2>
      <v-btn @click="onDelete(contact.number)" v-if="editMode">Suprimer</v-btn>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field outlined
          type="text"
          label="Prénom"
          v-model="contact.firstName"
          :readonly="!editMode"
          prepend-inner-icon="person" />
      </v-col>
      <v-col>
        <v-text-field outlined
        type="text"
        label="Nom"
        v-model="contact.lastName"
        :readonly="!editMode"
        prepend-inner-icon="person" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="8">
        <v-text-field outlined
          type="email"
          label="Email"
          v-model="contact.email"
          :readonly="!editMode"
          prepend-inner-icon="email" />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field outlined
        label="Téléphone"
        v-model="contact.phone"
        :readonly="!editMode"
        prepend-inner-icon="phone" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: [
    'contact',
    'editMode',
    'onDelete',
  ],
};
</script>

<style lang="scss" scoped>

</style>
