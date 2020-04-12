<template>
  <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <h1 class="text-center">Ecrire un nouveau message</h1>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="6">
          <NewMessageForm />
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import NewMessageForm from '@/components/forms/NewMessageForm.vue';

export default {
  components: {
    NewMessageForm,
  },
};
</script>

<style>

</style>
