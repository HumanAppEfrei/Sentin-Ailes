<template>
  <div>
    <div>
      <h1>{{ event.title }}</h1>
      <h2>{{ event.date }}</h2>
      <h2>{{ event.time }}</h2>
    </div>
    <div>
      <v-btn @click="onAccept">Accepter</v-btn>
      <v-btn @click="onReject">Refuser</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventRequestCard',
  props: ['event'],
  methods: {
    onAccept() {
      this.$emit('accept');
    },
    onReject() {
      this.$emit('reject');
    },
  },
};
</script>

<style scoped>
</style>
