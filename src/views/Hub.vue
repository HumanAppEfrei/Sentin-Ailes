<template>
  <v-container>
      <v-row>
          <v-col cols="12" sm="6">
            <MenuTile color="red" icon="home" text="yeet" link="/"/>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="12" sm="6">
            <MenuTile/>
          </v-col>
      </v-row>

      <v-row>
          <v-col cols="12" sm="6">
            <MenuTile/>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="12" sm="6">
            <MenuTile/>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import MenuTile from '@/components/MenuTile.vue';

export default {
  components: {
    MenuTile,
  },
};
</script>

<style>

</style>
