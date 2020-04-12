<template>
  <v-container>
    <h1 class="my-12">Consulter vos notes</h1>
    <v-row>
      <v-col cols="12">
        <v-progress-linear indeterminate></v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="note in notes" :key="note.date" cols="12" sm="6" md="4" lg="3">
        <NoteCard :noteData="note"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue';

export default {
  components: {
    NoteCard,
  },
  data() {
    return {
      notes: [],
    };
  },
};
</script>
