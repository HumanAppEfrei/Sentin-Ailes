<template>
  <div>
    <h1></h1>
    <v-row class="main">
    <v-col class="flex-grow-0">
      <v-date-picker v-model="date" />
    </v-col>
    <v-col class="d-flex flex-column">
      <v-text-field outlined
      v-model="destinataires"
      class="flex-grow-0"
      label="Participant(s)" />
      <v-textarea outlined
      v-model="message"
      class="flex-grow-0"
      label="Message" />
      <v-btn class="align-self-center" color="primary">Envoyer</v-btn>
    </v-col>
  </v-row>
  </div>

</template>

<script>
export default {
  name: 'EventEditor',
  data() {
    return {
      date: '',
      destinataires: '',
      message: '',
    };
  },

};
</script>

<style lang="scss" scoped>
.main {
  padding: 5% 15%;
}
</style>
