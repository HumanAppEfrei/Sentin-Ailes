<template>
  <v-container>
    <h1>Whitelist (authorized emails and associated roles)</h1>

    <v-data-table
      :headers="tableHeaders"
      :items="whitelistRecords"
      multi-sort
    >
      <template v-slot:item.btn="{ item }">
        <v-btn color="primary" @click="deleteItem(item)">
          Delete
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { whitelistCollection } from '@/firebaseConfig';

export default {
  name: 'WhitelistView',

  data() {
    return {
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
    };
  },

  methods: {
    initItemDeletion(item) {
      console.log(item);
    },

    async deleteItem(item) {
      await item.ref.delete();
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
