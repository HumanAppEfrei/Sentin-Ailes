<template>
  <v-card outlined elevation="2">

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
      <v-btn icon elevation="1" color="error" @click="deleteNote">
        <v-icon>delete</v-icon>
      </v-btn>
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
      const months = [
        'Janvier',
        'Fevrier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Aout',
        'Septembre',
        'Octobre',
        'Novembre',
        'Decembre',
      ];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const formatedHour = (`0${a.getHours()}`).slice(-2);
      const formatedMinu = (`0${a.getMinutes()}`).slice(-2);
      const time = `Le ${date} ${month} ${year} à ${formatedHour}h${formatedMinu}`;
      return time;
    },

    deleteNote() {
      // console.log('dispatch tes grand morts');
      // console.log(this.$store.getters['auth/user']);
      this.$store.dispatch('notes/deleteNoteFromUser', {
        userId: this.$store.getters['auth/user'].uid,
        noteId: this.noteData.id,
      });
    },
  },
};
</script>
