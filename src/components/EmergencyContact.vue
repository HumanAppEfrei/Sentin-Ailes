<template>
  <v-container>
    <v-row justify="space-between">
      <h2>Contact {{ contact.number }}</h2>
      <v-dialog  v-if="editMode" v-model="dialog" max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn color="error" v-on="on">Suprimer</v-btn>
      </template>
      <v-card raised>
        <v-card-title>
          Attention !
        </v-card-title>
        <v-card-text>
          Êtes-vous sur de vouloir supprimer {{contact.firstname}} {{contact.lastname}} de vos contacts d'urgences ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onDelete(contact.number)">Oui</v-btn>
          <v-btn color="error" @click="dialog = false">Non</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field outlined
          type="text"
          label="Prénom"
          v-model="contact.firstname"
          :readonly="!editMode"
          prepend-inner-icon="person" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field outlined
        type="text"
        label="Nom"
        v-model="contact.lastname"
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
  data() {
    return {
      dialog: false,
    };
  },
  props: [
    'contact',
    'editMode',
  ],
  methods: {
    onDelete() {
      this.$data.dialog = false;
      this.$emit('delete', this.$props.contact.number);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
