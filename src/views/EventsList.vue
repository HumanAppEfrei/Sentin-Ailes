<template>
  <v-container>
    <h1>Consulter mes évenement programmés</h1>
  <v-row>
    <v-col class="flex-grow-0">
      <v-date-picker v-model="selectedDate"></v-date-picker>
    </v-col>
    <v-col>
      <v-row class="flex-column align-center">
        <h2>Dans la semaine</h2>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: '',
    };
  },
};
</script>

<style scoped>
</style>
