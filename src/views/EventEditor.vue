<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <h1 v-if="isNew">Ajouter un évenement</h1>
        <h1 v-else>Modifier un évenement</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-form @submit.prevent="sendEvent">
          <v-dialog
            ref="dialogHours"
            v-model="hoursMenu"
            :return-value.sync="hour"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                v-model="hour"
                label="Horaire"
                append-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="hoursMenu"
              v-model="hour"
              full-width
              header-color="calendar"
              format="24hr"
            >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="hoursMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialogHours.save(hour)">OK</v-btn>
            </v-time-picker>
          </v-dialog>

          <v-dialog
            ref="dialogDate"
            v-model="dateMenu"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                v-model="date"
                label="Date"
                append-icon="today"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-if="dateMenu"
              v-model="date"
              full-width
              header-color="calendar"
              locale="fr"
            >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialogDate.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-text-field outlined
            append-icon="people"
            v-model="destinataires"
            label="Participant(s)" />

          <v-textarea outlined
          v-model="message"
          label="Message"
          height="300px" />
          <v-btn type="submit" dark color="calendar">Valider</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { Timestamp } from '@/firebaseConfig';

export default {
  name: 'EventEditor',

  data() {
    return {
      isNew: true,
      dateMenu: false,
      hoursMenu: false,

      hour: null,
      date: null,
      destinataires: '',
      message: '',
    };
  },
  props: ['id'],

  methods: {
    sendEvent() {
      const event = {
        hour: this.hour,
        date: this.date,
        destinataires: this.destinataires,
        message: this.message,
      };

      const nexDate = Date.parse(`${event.date}`);

      console.log(nexDate);
    },
  },

  created() {
    if (this.$route.path === '/calendar/event-editor/new') this.$data.isNew = true;
    else this.$data.isNew = false;
  },
};
</script>
