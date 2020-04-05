<template>
  <div>
    <v-card height="150px">
      <v-card-title>{{ event.name }}</v-card-title>
      <v-card-text>{{ event.description }} </v-card-text>
    </v-card>
  </div>
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


</style>
