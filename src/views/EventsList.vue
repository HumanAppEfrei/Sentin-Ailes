<template>
  <v-container>
    <h1 class="my-12">Consulter mes évenement programmés</h1>
    <!-- Date selector: small screen -->
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
        color="green darken-3"
        v-model="selectedDate"
        @input="onFilterEvents" />
    </v-dialog>
    <v-row>
      <!-- Date Selector: large screen -->
      <v-col class="flex-grow-0 hidden-sm-and-down">
        <v-date-picker
          color="green darken-3"
          v-model="selectedDate"
          @input="onFilterEvents"
          fixed />
        <v-btn
          color="error"
          @click="onResetDate"
          v-if="selectedDate !== null">Réinitialiser</v-btn>
      </v-col>

      <!-- Event List : Unfiltered -->
      <v-col class="flex-column align-center" v-if="!selectedDate">
        <h2 class="text-center">Dans la semaine</h2>
        <event-card
          v-for="event in events"
          :key="event.id"
          :event="event" />
      </v-col>
      <!-- Event List : Filtered -->
      <v-col class="flex-column align-center" v-else>
        <h2 class="text-center">{{ selectedDate }}</h2>
        <event-card v-for="event in filteredEvents" :key="event.id" :event="event" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import EventCard from '../components/EventCard.vue';

// const eventDemo = {
//   id: 1,
//   name: 'Demo event',
//   date: '2020-04-01',
//   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
// };

export default {
  name: 'EventsList',
  data() {
    return {
      selectedDate: null,
      dateDialog: false,
      filteredEvents: [],
    };
  },

  components: {
    EventCard,
  },

  computed: {
    ...mapGetters({
      events: 'events/getEvents',
    }),
  },

  methods: {
    onFilterEvents() {
      const { selectedDate, events } = this.$data;
      this.$data.filteredEvents = events.filter(event => event.date === selectedDate);
      this.$data.dateDialog = false; // Closing dialog
    },
    onResetDate() {
      this.$data.selectedDate = null;
    },
  },

  beforeCreate() {
    this.$store.dispatch('events/fetchAllEventsForUser', { uid: this.$store.getters['auth/user'].uid });
  },
};
</script>
