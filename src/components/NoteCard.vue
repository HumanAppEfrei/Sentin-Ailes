<template>
  <v-card outlined>
    <v-card-title>
      {{ noteData.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ noteData.author }} le {{ noteData.date }}
    </v-card-subtitle>
    <v-card-text>
      {{ noteData.message }}
    </v-card-text>
    <v-card-actions>
      <v-btn class="right" color="error">Supprimer</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NoteCard',

  props: ['noteData'],
};
</script>
