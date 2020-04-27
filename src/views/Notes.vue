<template>
  <v-container>
    <v-row class="align-center">
      <v-col cols="12" md="8"><h1 class="my-12">Consulter vos notes</h1></v-col>
      <v-col cols="4">
        <v-btn @click="toggleDialog" block color="primary">Ajouter une note</v-btn>
      </v-col>
    </v-row>
    <v-row v-show="updating">
      <v-col cols="12">
        <v-progress-linear indeterminate></v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="note in notes" :key="note.id" cols="12" sm="6" md="4" lg="3">
        <NoteCard :noteData="note"/>
      </v-col>
    </v-row>


    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-form ref="newNoteForm" @submit.prevent="addNote" v-model="formValid">
          <v-toolbar dark color="green darken-4">
            <v-btn icon dark @click="toggleDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Ajouter une note</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text type="submit">Envoyer</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <h2>Remplir tous les champs.</h2>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  type="text"
                  v-model="object"
                  label="Objet de votre message"
                  :rules="notEmpty"
                  required
                  clearable clear-icon="backspace"
                  outlined/>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-textarea
                  auto-grow
                  no-resize
                  type="text"
                  v-model="message"
                  label="Contenu de votre message"
                  :rules="notEmpty"
                  required
                  outlined/>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
    </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteCard from '@/components/NoteCard.vue';

export default {
  components: {
    NoteCard,
  },

  data() {
    return {
      dialog: false,
      object: '',
      message: '',
      notEmpty: [
        v => !!v || 'Ce champ doit être remplie',
      ],
    };
  },

  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },

    submitForm() { this.$refs.newNoteForm.submit(); },

    addNote() {
      this.$store.dispatch('notes/addNoteToSelf', {
        title: this.object,
        message: this.message,
      });

      this.dialog = false;
    },
  },

  computed: {
    ...mapGetters({
      updating: 'notes/isUpdating',
      notes: 'notes/ownNotes',
    }),
  },

  beforeCreate() {
    this.$store.dispatch('notes/fetchOwnNotes');
  },
};
</script>
