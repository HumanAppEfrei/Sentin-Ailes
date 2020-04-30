<template>
  <v-container class="d-flex flex-column justify-content-center align-center">
      <p class="green" v-if="result=='success'">Bonne réponse !</p>
      <p class="red" v-else-if="result=='failure'">Mauvaise réponse ...</p>
      <p></p>
      <p class="display-4">{{ numberA }} {{ operator }} {{ numberB }} =</p>
      <v-text-field type="number" class="flex-grow-0" label="Response" v-model="response" outlined />
      <v-btn @click="onResponse()">Submit</v-btn>
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
      result: false,
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
          this.operator = '-';
          this.expected = this.numberA - this.numberB;
          break;
        case 2:
          this.operator = '*';
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
        this.result = 'success';
      } else {
        this.result = 'failure';
      }
      this.response = null;
    },
  },
  created() {
    this.generateOperation();
  },
};
</script>
