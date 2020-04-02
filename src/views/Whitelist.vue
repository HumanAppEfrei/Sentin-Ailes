<template>
  <v-container>
    <h1>Whitelist (emails autorisés et rôles associés)</h1>

    <h2>Ajouter une entrée</h2>
    <v-form ref="whitelistEntryForm" @submit.prevent="handleFormSubmission">
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="newEntryEmail" placeholder="Email" outlined class="pa-0" />
        </v-col>
        <v-col cols="3">
          <v-select v-model="newEntryRole" :items="possibleRoles" item-text="name" item-value="value" placeholder="Role" outlined />
        </v-col>
        <v-col cols="3">
          <v-btn block color="primary" type="submit">
            Ajouter l'entrée
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <h2>Liste des entrées</h2>
    <v-data-table
      :headers="tableHeaders"
      :items="whitelistRecords"
      :search="searchFilter"
      multi-sort
    >
      <template v-slot:top>
        <v-container class="mb-0">
          <v-text-field v-model="searchFilter" placeholder="Filtrer la liste" outlined />
        </v-container>
      </template>

      <template v-slot:item.btn="{ item }">
        <v-btn color="primary" @click="initItemDeletion(item)">
          Delete
        </v-btn>
      </template>
    </v-data-table>

    <!-- Whitelist record deletion confirmation dialog -->
    <v-dialog v-model="showDialog" @click:outside="closeDialog" max-width="600">
      <v-card class="pa-5">
        <v-card-title>Supprimer cette entrée ?</v-card-title>
        <v-card-actions class="d-flex justify-end mt-3">
          <v-btn color="primary" class="mx-4" @click="closeDialog">
            Annuler la suppression
          </v-btn>
          <v-btn color="error" @click="deleteItemAndCloseDialog">
            Supprimer cette entrée
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { whitelistCollection } from '@/firebaseConfig';

export default {
  name: 'WhitelistView',

  data() {
    return {
      newEntryEmail: '',
      newEntryRole: '',
      searchFilter: '',
      possibleRoles: [
        {
          name: 'Bénéficiaire',
          value: 'beneficiaire',
        },
        {
          name: 'Intervenant',
          value: 'intervenant',
        },
        {
          name: 'Administrateur',
          value: 'admin',
        },
        {
          name: 'Super administrateur',
          value: 'superAdmin',
        },
      ],
      unsubscribeFromSubscription: null,
      tableHeaders: [
        {
          text: 'Email',
          value: 'data.email',
          sortable: true,
        },
        {
          text: 'Role',
          value: 'data.userType',
          sortable: true,
        },
        {
          text: '',
          value: 'btn',
          sortable: false,
          align: 'center',
        },
      ],
      whitelistRecords: [],
      selectedRecord: null,
      showDialog: false,
    };
  },

  methods: {
    async handleFormSubmission() {
      try {
        await whitelistCollection.add({
          email: this.newEntryEmail,
          userType: this.newEntryRole,
        });

        this.newEntryEmail = '';
        this.newEntryRole = '';
      } catch (err) {
        console.error(err);
      }
    },

    initItemDeletion(item) {
      this.selectedRecord = item;
      this.showDialog = true;
    },

    closeDialog() {
      this.selectedRecord = null;
      this.showDialog = false;
    },

    deleteItemAndCloseDialog() {
      this.selectedRecord.ref.delete();
      this.closeDialog();
    },
  },

  async beforeMount() {
    // Gather all whitelist records from database
    this.whitelistRecords = (await whitelistCollection.get()).docs.map(doc => ({ ref: doc.ref, data: doc.data() }));

    // Subscribe to changes (and save unsubcription function)
    this.unsubscribeFromSubscription = whitelistCollection.onSnapshot((snapshot) => {
      this.whitelistRecords = snapshot.docs.map(doc => ({ ref: doc.ref, data: doc.data() }));
    });
  },

  async beforeDestroy() {
    // Unsubscribe from subscription
    this.unsubscribeFromSubscription();
  },
};
</script>
