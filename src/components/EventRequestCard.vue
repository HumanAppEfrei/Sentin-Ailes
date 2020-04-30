<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card-title>{{ event.title }}</v-card-title>
        <v-card-subtitle>{{ event.date }} - {{ event.time }}</v-card-subtitle>
        <v-card-text>{{ event.description }}</v-card-text>
      </v-col>
      <v-col sm="3" cols="12" class="d-flex flex-sm-column justify-space-around align-center">
        <v-btn color="primary" @click="onAccept">Accepter</v-btn>
        <v-btn color="error" @click="onReject">Refuser</v-btn>
      </v-col>
    </v-row>
  </v-card>
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
