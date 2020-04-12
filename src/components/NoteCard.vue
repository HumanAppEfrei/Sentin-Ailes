<template>
  <v-card oulined>
    <v-card-title>
      {{ this.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ this.author }} le {{ this.date }}
    </v-card-subtitle>
    <v-card-text>
      {{ this.message }}
    </v-card-text>
    <v-card-actions>
      <v-btn>Voir plus</v-btn>
      <v-btn color="error">Supprimer</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const testdata = {
  title: 'titre',
  author: 'ziakeur',
  data: '2020-10-10',
  message: 'va te faire foutre',
};

export default {
  name: 'NoteCard',

  data() {
    return {
      title: '',
      author: '',
      date: '',
      message: '',
    };
  },

  methods: {
    assigneData() {
      this.title = testdata.title;
      this.author = testdata.author;
      this.date = testdata.date;
      this.message = testdata.message;
    },
  },
};
</script>
