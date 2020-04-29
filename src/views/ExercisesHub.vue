<template>
  <v-container fluid>
      <v-row justify="center">
          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="exercise" icon="fab fa-buromobelexperte" text="Simon Says" link="/"/>
          </v-col>

          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="exercise" icon="fas fa-brain" text="Memory" link="/"/>
          </v-col>
      </v-row>

      <v-row justify="center">
          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="exercise" icon="fas fa-calculator" text="Calcul mental" link="/"/>
          </v-col>

          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="exercise" icon="timer" text="Jeu de rapidité" link="/"/>
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
