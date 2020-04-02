<template>
  <div>
    <h1>Whitelist (authorized emails and associated roles)</h1>

    <v-data-table
      :headers="tableHeaders"
      :items="whitelistEntries"
    >
    </v-data-table>
  </div>
</template>

<script>
import { whitelistCollection } from '@/firebaseConfig';

export default {
  name: 'WhitelistView',

  data() {
    return {
      tableHeaders: [
        {
          text: 'Email',
          value: 'email',
          sortable: true,
        },
        {
          text: 'Role',
          value: 'userType',
          sortable: true,
        },
      ],
      whitelistRecords: [],
    };
  },

  computed: {
    whitelistEntries() {
      return this.whitelistRecords.map(record => record.data);
    },
  },

  async beforeMount() {
    this.whitelistRecords = (await whitelistCollection.get()).docs.map(doc => ({ ref: doc.ref, data: doc.data() }));
  },
};
</script>
