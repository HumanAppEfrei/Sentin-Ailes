<template>
    <v-card class="event-card" min-width="60%">
      <v-row>
        <v-col cols="12" sm="8">
          <v-card-title>{{ event.title }}</v-card-title>
          <v-card-subtitle>{{ timeConverter(event.date) }}</v-card-subtitle>
          <v-card-text>{{ event.description }} </v-card-text>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-center align-sm-center">
          <router-link :to="'/calendar/event-editor/' + event.id">
           <v-btn>Modifier</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
export default {
  name: 'EventCard',
  data() {
    return {
      eventName: 'Event Name',
    };
  },
  props: [
    'event',
  ],

  methods: {
    timeConverter(timestamp) {
      const a = timestamp.toDate();
      const months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const formatedHour = (`0${a.getHours()}`).slice(-2);
      const formatedMinu = (`0${a.getMinutes()}`).slice(-2);
      const time = `Le ${date} ${month} ${year} à ${formatedHour}h${formatedMinu}`;
      return time;
    },
  },
};
</script>

<style scoped>
.event-card {
  margin: 20px 0px;
  padding-right: 30px;
}
</style>
