<template>
    <v-card class="event-card" min-width="60%">
      <v-row>
        <v-col cols="12" sm="8">
          <v-card-title>{{ event.name }}</v-card-title>
          <v-card-subtitle>{{ event.date }}</v-card-subtitle>
          <v-card-text>{{ event.description }} </v-card-text>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-center align-sm-center">
          <v-btn :href="'/events/' + event.id">Modifier</v-btn>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      eventName: 'Event Name',
    };
  },
  props: [
    'event',
  ],
};
</script>

<style scoped>
.event-card {
  margin: 20px 0px;
  padding-right: 30px;
}
</style>
