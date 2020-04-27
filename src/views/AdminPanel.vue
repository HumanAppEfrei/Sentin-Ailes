<template>
  <div class="admin-panel p0 d-flex">
    <AdminSidenav />
    <v-container class="admin-panel-content">
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
import AdminSidenav from '@/components/AdminSidenav.vue';

export default {
  name: 'AdminPanel',

  components: {
    AdminSidenav,
  },
};
</script>

<style>
.admin-panel {
  height: 100%;
}

.admin-panel-content {
  overflow-y: scroll;
}
</style>
