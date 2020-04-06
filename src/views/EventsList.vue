<template>
  <main>
    <h1>Consulter mes évenement programmés</h1>
    <v-row>
      <v-col class="flex-grow-0">
        <v-date-picker v-model="selectedDate" fixed></v-date-picker>
      </v-col>
      <v-col class="flex-column align-center">
        <h2 class="text-center">Dans la semaine</h2>
        <event-card v-for="event in events" :key="event.id" :event="event"></event-card>
      </v-col>
    </v-row>
  </main>
</template>

<script>
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
      selectedDate: '',
      events: [
        eventDemo,
        eventDemo,
        eventDemo,
      ],
    };
  },
  components: {
    EventCard,
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2% 10%;
}
h1 {
  padding-bottom: 5%;
}
</style>
