<template>
  <main class=".d-flex flex-column main">
    <h1 class="my-12">Consulter mes évenement programmés</h1>
    <v-dialog v-model="dateDialog" max-width="300px">
      <template v-slot:activator="{ on }">
        <v-text-field outlined
        class="hidden-md-and-up flex-grow-0"
        v-model="selectedDate"
        label="Date"
        prepend-inner-icon="date_range"
        v-on="on"
        clearable
        readonly />
      </template>
      <v-date-picker
        v-model="selectedDate"
        @input="onFilterEvents" />
    </v-dialog>
    <v-row>
      <v-col class="flex-grow-0 hidden-sm-and-down">
        <v-date-picker v-model="selectedDate" v-on="onFilterEvents" fixed></v-date-picker>
      </v-col>
      <v-col class="flex-column align-center" v-if="!selectedDate">
        <h2 class="text-center">Dans la semaine</h2>
        <event-card v-for="event in events" :key="event.id" :event="event"></event-card>
      </v-col>
      <v-col class="flex-column align-center" v-else>
        <h2 class="text-center">{{ selectedDate }}</h2>
        <event-card v-for="event in filteredEvents" :key="event.id" :event="event"></event-card>
      </v-col>
    </v-row>
  </main>
</template>

<script>
import { filter } from 'lodash';

import EventCard from '../components/EventCard.vue';

const eventDemo = {
  id: 1,
  name: 'Demo event',
  date: '2020-04-01',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

export default {
  data() {
    return {
      selectedDate: null,
      dateDialog: false,
      events: [
        eventDemo,
        eventDemo,
        eventDemo,
      ],
      filteredEvents: [],
    };
  },
  components: {
    EventCard,
  },
  methods: {
    onFilterEvents() {
      const { selectedDate, events } = this.$data;
      this.$data.filteredEvents = filter(events, event => event.date === selectedDate);
      console.log(this.$data.filteredEvents);
      this.$data.dateDialog = false;
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2% 10%;
}

@media only screen and (max-width: 599px) {
  .main {
    padding: 2%;
  }
}
</style>
