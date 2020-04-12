<template>
  <v-container>
    <div v-if="!message.read">
      <v-card>
        <v-row>
          <v-col>
            <v-card-title>
              <v-badge
                class="pr-2"
                color="red"
                left="true"
                icon="mail"
                inline="true">
              </v-badge>
              {{message.sender}}
            </v-card-title>
            <v-card-subtitle>{{message.object}} - {{message.date}}</v-card-subtitle>
            <v-card-text class="d-inline-block text-truncate">{{message.content}}</v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div v-else>
      <v-card>
        <v-row>
          <v-col>
            <v-card-title>{{message.sender}}</v-card-title>
            <v-card-subtitle>{{message.object}} - {{message.date}}</v-card-subtitle>
            <v-card-text class="d-inline-block text-truncate">{{message.content}}</v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'MessageCard',
  props: [
    'message',
  ],
};
</script>
