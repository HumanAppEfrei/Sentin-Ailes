<template>
  <v-container class="mx-auto" max-width="500" fill-height v-model="level">
    <v-container fuild>
      <v-row dense justify="center">
        <h1>Niveau actuel : {{level}}</h1>
      </v-row>

      <v-row dense justify="center">
        <h2>Meilleur score : {{highscore}}</h2>
      </v-row>

      <v-spacer class="py-5"></v-spacer>

      <v-row dense justify="center">
        <v-col
          v-for="card in cards.filter(c => c.number < 2)"
          :key="card.number"
          cols="6"
          sm="3">
          <v-card
            class="simon-button"
            outlined
            :color="card.color"
            :disabled="!cardEnabled"
            :hover="cardEnabled"
            :ripple="cardEnabled"
            @click="registerClick(card.number)"
            height="150">

            <v-container fill-height>
                <v-col align="center">
                  <v-card
                    class="simon-subcard"
                    outlined
                    :color="card.innerColor"
                    disabled
                    :hover="!cardEnabled"
                    :ripple="false"
                    height="100">
                    <p></p>
                  </v-card>
                </v-col>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row dense justify="center">
        <v-col
          v-for="card in cards.filter(c => c.number >= 2)"
          :key="card.number"
          cols="6"
          sm="3">
          <v-card
            class="simon-button"
            outlined
            :color="card.color"
            :disabled="!cardEnabled"
            :hover="cardEnabled"
            :ripple="cardEnabled"
            @click="registerClick(card.number)"
            height="150">

            <v-container fill-height>
                <v-col align="center">
                  <v-card
                    class="simon-subcard"
                    outlined
                    :color="card.innerColor"
                    disabled
                    :hover="!cardEnabled"
                    :ripple="false"
                    height="100">
                    <p></p>
                  </v-card>
                </v-col>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-spacer class="py-5"></v-spacer>

      <v-row dense justify="center">
        <v-btn
        color="teal"
        dark
        x-large
        :disable="buttonEnabled"
        @click="startNewLevel()">
        {{buttonText}}
        </v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        number: 0, color: 'green', innerColor: 'rgba(0, 0, 0, 0.7)', flex: 6,
      },
      {
        number: 1, color: 'red', innerColor: 'rgba(0, 0, 0, 0.7)', flex: 6,
      },
      {
        number: 2, color: 'orange', innerColor: 'rgba(0, 0, 0, 0.7)', flex: 6,
      },
      {
        number: 3, color: 'blue', innerColor: 'rgba(0, 0, 0, 0.7)', flex: 6,
      },
    ],

    level: 0,
    highscore: 0,
    buttonText: 'Nouvelle partie',
    buttonEnabled: true,
    cardEnabled: false,
    NUMBER_OF_CARDS: 4,

    userInput: [],
    sequence: [],
    nbrClicks: 0,
    max: 4,
    done: false,
  }),

  methods: {
    clearLevel() {
      // Setting values
      this.level += 1;
      this.max += 1;
      this.buttonEnabled = false;
      this.userInput = [];
    },

    incrementSequence() {
      this.sequence.push(Math.floor(Math.random() * Math.floor(this.NUMBER_OF_CARDS)));
    },

    showSequence() {
      const seq = this.sequence;

      setTimeout(() => {
        this.cardEnabled = true;
      }, (seq.length * 1600) + 500);

      for (let i = 0; i < seq.length; i += 1) {
        const card = this.cards[seq[i]];
        setTimeout(() => {
          card.innerColor = 'rgba(0, 0, 0, 0)';

          setTimeout(() => {
            card.innerColor = 'rgba(0, 0, 0, 0.7)';
          }, 1300);
        }, 600);
      }
    },

    registerClick(number) {
      this.cards[number].innerColor = 'rgba(0, 0, 0, 0)';
      this.userInput.push(number);
      this.nbrClicks += 1;
      setTimeout(() => {
        this.cards[number].innerColor = 'rgba(0, 0, 0, 0.7)';
      }, 350);
    },

    compareSequences() {
      for (let i = 0; i < this.sequence.length; i += 1) {
        if (this.sequence[i] !== this.userInput[i]) {
          break;
        }

        if (i === this.sequence.length - 1) {
          return true;
        }
      }

      return false;
    },

    deduceResults(win) {
      if (win) {
        // If the current score is the highscore
        if (this.level > this.highscore) {
          // Set highscore to current score
          this.highscore = this.level;
        }

        // Set the button's text's value
        this.buttonText = 'Continuer';
      } else {
        // Set the level to the current (unbeat) level
        this.level -= 1;

        // Clear sequence
        this.sequence = [];

        // Set start button value
        this.buttonText = 'Recommencer';
      }
    },

    startNewLevel() {
      // Disable user input
      this.cardEnabled = false;

      // Clear level to start new level
      this.clearLevel();

      /* LEVEL START */

      // 1. Increment random sequence by one move
      this.incrementSequence();


      // 2. Light up squares according to sequence & enable user input
      this.showSequence();


      // 4. Wait for user input


      // 5. Compare user input to sequence
      const win = this.compareSequences();

      /* END OF LEVEL */


      // Deduce from game result
      this.deduceResults(win);
    },
  },
};
</script>
