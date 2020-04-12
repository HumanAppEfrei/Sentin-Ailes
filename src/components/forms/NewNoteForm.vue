<template>
  <v-form ref="newMessageForm" @submit.prevent="sendMessage" v-model="formValid">
    <v-container fluid>
      <v-row cols="12" sm="6">
        <v-col>
          <v-snackbar
            v-model="snackbar"
            :timeout="0"
            color="success"
            top
            multi-line>
            {{snackMessage}}

            <v-btn
              dark
              text
              @click="snackbar = false">
              Fermer
            </v-btn>
          </v-snackbar>

          <h2 class="text-center">Votre message</h2>
        </v-col>
      </v-row>
      <h3>Remplir tous les champs.</h3>
      <v-row cols="12" sm="6">
        <v-col>
          <v-text-field
            type="text"
            v-model="recipient"
            label="Destinataire du message"
            :rules="recipientRules"
            required
            prepend-inner-icon="person"
            clearable clear-icon="backspace"
            outlined/>
        </v-col>
      </v-row>

      <v-row cols="12" sm="6">
        <v-col>
          <v-text-field
            type="text"
            v-model="object"
            label="Objet de votre message"
            :rules="objectRules"
            required
            prepend-inner-icon="flag"
            clearable clear-icon="backspace"
            outlined/>
        </v-col>
      </v-row>

      <v-row cols="12" sm="6">
        <v-col>
          <v-textarea
            auto-grow="true"
            no-resize="true"
            type="text"
            v-model="message"
            label="Contenu de votre message"
            :rules="messageRules"
            required
            prepend-inner-icon="create"
            outlined/>
        </v-col>
      </v-row>

      <v-row cols="12" sm="6">
        <v-col>
          <v-btn
            :disabled="!formValid"
            x-large
            type="submit"
            color="pink"
            @click="sendMessage()"
            class="white--text">
            Envoyer
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'NewMessageForm',
  sentText: 'Message envoyé',

  data() {
    return {
      snackbar: false,
      formValid: false,
      messageSent: false,
      recipient: '',
      object: '',
      message: '',
      recipientRules: [
        v => !!v || 'Votre message doit avoir un destinataire',
      ],
      objectRules: [
        v => !!v || 'Votre message doit avoir un objet',
      ],
      messageRules: [
        v => !!v || 'Votre message doit comporter du texte',
      ],
    };
  },

  methods: {
    sendMessage() {
      if (this.formValid) {
        // TODO: Add form emit

        this.$refs.newMessageForm.reset();

        this.snackMessage = 'Message envoyé.';
        this.snackbarColor = 'success';
        this.snackbar = true;

        this.messageSent = true;
      }
    },
  },
};
</script>

<style>

</style>
