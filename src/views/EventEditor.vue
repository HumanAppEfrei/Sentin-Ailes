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
        <v-form @submit.prevent="sendEvent" v-model="formValid">
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
                :rules="notEmpty"
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
                :rules="notEmpty"
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

          <v-autocomplete
            outlined
            multiple
            :rules="notEmpty"
            label="Déstinataire"
            v-model="autoModel"
            :items="destinataires"
          ></v-autocomplete>

          <v-textarea outlined
          v-model="description"
          :rules="notEmpty"
          label="Description"
          height="300px" />
          <v-btn
            :disabled="!formValid"
            :loading="updating"
            type="submit"
            color="calendar"
          >Valider</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Timestamp, getUserPeopleSubcollection } from '@/firebaseConfig';
import { mapGetters } from 'vuex';

export default {
  name: 'EventEditor',

  data() {
    return {
      formValid: false,
      updating: false,
      isNew: true,
      dateMenu: false,
      hoursMenu: false,
      autoModel: null,

      hour: null,
      date: null,
      destinataires: [],
      description: '',
      notEmpty: [
        v => !!v || 'Ce champ doit être remplie',
      ],
    };
  },
  props: ['id'],

  computed: {
    ...mapGetters({
      status: 'events/getStatus',
    }),

    concerned() {
      const concern = this.autoModel.map(val => val);
      concern.push(this.getUid);
      return concern;
    },

    getUid() {
      return this.$store.getters['auth/user'].uid;
    },
  },

  watch: {
    status(newValue) {
      switch (newValue) {
        case 'sent':
          this.updating = false;

          this.$swal({
            icon: 'success',
            titleText: 'Evènement bien enregisté',
          });

          this.hour = null;
          this.date = null;
          this.destinataires = [];
          this.description = '';
          break;
        case 'error':
          this.updating = false;

          this.$swal({
            icon: 'error',
            titleText: 'Une erreur s\'est produite pendant l\'enregistrement, merci de réessayer',
          });
          break;
        case 'updating':
          this.updating = true;
          break;
        default:
          this.updating = false;
      }
    },
  },

  methods: {
    sendEvent() {
      if (this.formValid) {
        const nexDate = Timestamp.fromDate(new Date(`${this.date} ${this.hour}`));

        const event = {
          date: nexDate,
          concerned: this.concerned,
          acceptedBy: [this.getUid],
          description: this.description,
        };

        // console.log(this.autoModel);
        // console.log(event);
        this.$store.dispatch('events/addEvent', event);
      }
    },
  },

  async created() {
    if (this.$route.path === '/calendar/event-editor/new') this.$data.isNew = true;
    else this.$data.isNew = false;

    this.destinataires = (await getUserPeopleSubcollection(this.$store.getters['auth/user'].uid).get())
      .docs.map(doc => ({ id: doc.id, ...(doc.data()) }))
      .map(people => ({ text: `${people.firstName} ${people.lastName}`, value: people.id }));
  },
};
</script>
