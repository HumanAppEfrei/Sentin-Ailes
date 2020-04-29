<template>
  <v-navigation-drawer
      color="primary"
      permanent
      app
    >
    <v-list>
      <v-list-item to="/admin/whitelist">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-account-details</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="white--text">
          Whitelist
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/admin/link-users">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-account-switch</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="white--text">
          Liaison utilisateurs
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AdminSidenav',
};
</script>

<style>

</style>
