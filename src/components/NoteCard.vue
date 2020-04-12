<template>
  <v-card outlined>
    <v-card-title>
      {{ noteData.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ noteData.author.firstName }} {{ noteData.author.lastName }} le {{ noteData.date }}
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
};
</script>
