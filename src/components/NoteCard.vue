<template>
  <v-card outlined>
    <v-card-title>
      {{ noteData.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ noteData.author.firstName }} {{ noteData.author.lastName }} le {{ timeConverter(noteData.date) }}
    </v-card-subtitle>
    <v-card-text>
      {{ noteData.message }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon elevation="1" color="error"><v-icon>delete</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NoteCard',

  props: ['noteData'],

  methods: {
    timeConverter(timestamp) {
      const a = timestamp.toDate();
      const months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const time = `${date} ${month} ${year}`;
      return time;
    },
  },
};
</script>
