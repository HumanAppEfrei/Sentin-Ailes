<template>
  <div class="main">
    <h1 v-if="isNew">Ajouter un évenement</h1>
    <h1 v-else>Modifier un évenement</h1>
    <v-row>
      <v-col class="flex-grow-0">
        <v-date-picker v-model="date" />
      </v-col>
      <v-col class="d-flex flex-column">
        <v-form class="d-flex flex-column flex-grow-1">
          <v-text-field outlined
            v-model="destinataires"
            class="flex-grow-0"
            label="Participant(s)" />
          <v-textarea outlined
          v-model="message"
          class="flex-grow-0"
          label="Message"
          height="300px" />
          <v-btn class="align-self-center" color="primary">Valider</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'EventEditor',
  data() {
    return {
      isNew: true,
      date: '',
      destinataires: '',
      message: '',
    };
  },
  props: ['id'],
  created() {
    if (this.$route.path === '/calendar/event-editor/new') this.$data.isNew = true;
    else this.$data.isNew = false;
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 5% 15%;
}
</style>
