<template>
  <router-link :to="link">
    <v-card align="center" min-height=225 dark :color="color" hover>
      <v-card-title class="justify-center">
          <v-icon size="75">{{ icon }}</v-icon>
      </v-card-title>
      <v-card-text class="text-center display-1 font-weight-medium white--text">
        {{ text }}
      </v-card-text>
      <div v-if="notif >= 1">
        <v-chip color="red" ripple=false label="Notification">
          {{ notif }} notification{{ notif === 1 ? '' : 's' }}
        </v-chip>
      </div>
    </v-card>
  </router-link>
</template>

<script>
export default {
  props: [
    'color',
    'icon',
    'text',
    'link',
    'notif',
  ],
};
</script>

<style lang="css">
  a {  text-decoration: none; }
  span .v-chip__content {
    font-size: 20px;
  }
</style>
