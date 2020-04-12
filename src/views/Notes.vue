<template>
  <v-container>
    <v-row>
      <v-col v-for="note in notes" :key="note" sm="3">
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
      notes: [
        {
          title: 'titre',
          author: 'ziakeur',
          date: '2020-10-10',
          message: 'vas te faire foutre',
        },
        {
          title: 'titre',
          author: 'ziakeur',
          date: '2020-10-10',
          // eslint-disable-next-line
          message: 'Fusce commodo aliquam arcu. Nunc sed turpis. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Sed lectus. Fusce commodo aliquam arcu. Nunc sed turpis. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Sed lectus.',
        },
        {
          title: 'titre',
          author: 'ziakeur',
          date: '2020-10-10',
          message: 'vas te faire foutre',
        },
        {
          title: 'titre',
          author: 'ziakeur',
          date: '2020-10-10',
          // eslint-disable-next-line
          message: 'Fusce commodo aliquam arcu. Nunc sed turpis. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Sed lectus. Fusce commodo aliquam arcu. Nunc sed turpis. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Sed lectus.',
        },
        {
          title: 'titre',
          author: 'ziakeur',
          date: '2020-10-10',
          message: 'vas te faire foutre',
        },
        {
          title: 'titre',
          author: 'ziakeur',
          date: '2020-10-10',
          // eslint-disable-next-line
          message: 'Fusce commodo aliquam arcu. Nunc sed turpis. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Sed lectus. Fusce commodo aliquam arcu. Nunc sed turpis. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Sed lectus.',
        },
        {
          title: 'titre',
          author: 'ziakeur',
          date: '2020-10-10',
          message: 'vas te faire foutre',
        },
        {
          title: 'titre',
          author: 'ziakeur',
          date: '2020-10-10',
          // eslint-disable-next-line
          message: 'Fusce commodo aliquam arcu. Nunc sed turpis. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Sed lectus. Fusce commodo aliquam arcu. Nunc sed turpis. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Sed lectus.',
        },
      ],
    };
  },
};
</script>
