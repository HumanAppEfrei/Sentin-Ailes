<template>
  <div>
    <h1>Vos demandes d'évenement</h1>
    <event-request-card
      v-for="(event, index) in eventRequest"
      :key="index" event="event"
      @accept="onEventAccepted(index)"
      @reject="onEventRejected(index)"
    />
  </div>
</template>

<script>
import EventRequestCard from '@/components/EventRequestCard.vue';

export default {
  name: 'EventRequest',
  data() {
    return {
      eventRequest: [],
    };
  },
  components: {
    EventRequestCard,
  },
  methods: {
    onEventAccepted(index) {
      console.log('event accepted');
      this.eventRequest.splice(index, 1);
    },
    onEventRejected(index) {
      console.log('event rejected');
      this.eventRequest.splice(index, 1);
    },
  },
  created() {
    // Load event request
    this.eventRequest = [
      {
        id: 1,
        title: 'Title',
        date: '2020-01-01',
        time: '10:00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum faucibus erat, in tempus augue sagittis et.',
      },
    ];
  },
};
</script>

<style scoped>
</style>
