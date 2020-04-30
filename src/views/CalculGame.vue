<template>
  <v-container >
      <v-form
        @submit.prevent="onResponse"
        class="d-flex flex-column justify-content-center align-center">

        <p class="display-4">
          {{ numberA }} {{ operator }} {{ numberB }} =
        </p>

        <v-text-field
          type="number"
          v-model="response"
          label="Response"
          class="flex-grow-0"
          outlined />

        <v-btn @click="onResponse">Submit</v-btn>
      </v-form>

      <v-snackbar :color="snackbar.color" v-model="snackbar.model" timeout="2000">
        {{ snackbar.message }}
        <v-btn color="black" text @click="result = false">Fermer</v-btn>
      </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      numberA: 0,
      numberB: 0,
      operator: '+',
      response: null,
      expected: 0,
      snackbar: {
        model: false,
        message: '',
        color: '',
      },
    };
  },
  methods: {
    generateOperation() {
      this.numberA = Math.floor(Math.random() * 10);
      this.numberB = Math.floor(Math.random() * 10);
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          this.operator = '+';
          this.expected = this.numberA + this.numberB;
          break;
        case 1:
          this.operator = '−';
          this.expected = this.numberA - this.numberB;
          break;
        case 2:
          this.operator = '×';
          this.expected = this.numberA * this.numberB;
          break;
        /* Division is to hard
        case 3:
          this.operator = '/';
          this.expected = this.numberA / this.numberB;
          break;
        */
        default:
          // do nothing
      }
    },
    onResponse() {
      if (Number(this.response) === this.expected) {
        this.generateOperation();
        this.snackbar.message = 'Bonne réponse !';
        this.snackbar.color = 'green';
      } else {
        this.snackbar.message = 'Mauvaise réponse ...';
        this.snackbar.color = 'red';
      }
      this.snackbar.model = true;
      this.response = null;
    },
  },
  created() {
    this.generateOperation();
  },
};
</script>
