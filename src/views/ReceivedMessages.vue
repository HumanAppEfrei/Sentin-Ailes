<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <h1 class="text-center">Messages reçus</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div v-if="checkForUnread(messages)">
          <h3>Messages non-lus</h3>

          <MessageCard
            v-for="msg in messages"
            v-show="!msg.read"
            :key="msg.id"
            :message="msg"
            class="py-4"/>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3>Messages</h3>

        <MessageCard
          v-for="msg in messages"
          v-show="msg.read"
          :key="msg.id"
          :message="msg"
          class="py-4"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MessageCard from '@/components/MessageCard.vue';


const msgDemoUnread = {
  id: 1,
  date: '2020-04-01',
  sender: 'LeZiakeurFouDuTorzka',
  object: 'Yeety Skeety',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet gravida leo, at consectetur odio. Suspendisse potenti. Nullam vel',
  read: false,
};

const msgDemoUnread2 = {
  id: 2,
  date: '2020-04-01',
  sender: 'LeZiakeurFouDuTorzka',
  object: 'Ziakety Ziak',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet gravida leo, at consectetur odio. Suspendisse potenti. Nullam vel',
  read: false,
};

const msgDemoRead = {
  id: 3,
  date: '2020-04-01',
  sender: 'LeVRAIZiakeurFouDuTorzka',
  object: 'Yeetus Maximus',
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  read: true,
};


export default {
  name: 'ReceivedMessages',
  components: {
    MessageCard,
  },
  data() {
    return {
      messages: [
        msgDemoUnread,
        msgDemoUnread2,
        msgDemoRead,
      ],
    };
  },
  methods: {
    checkForUnread(messages) {
      return messages.some(msg => !msg.read);
    },
  },
};
</script>
