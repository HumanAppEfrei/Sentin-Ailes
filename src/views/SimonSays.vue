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
        number: 0,
        color: 'green',
        innerColor: 'rgba(0, 0, 0, 0.7)',
        flex: 6,
        sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      },
      {
        number: 1,
        color: 'red',
        innerColor: 'rgba(0, 0, 0, 0.7)',
        flex: 6,
        sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
      },
      {
        number: 2,
        color: 'orange',
        innerColor: 'rgba(0, 0, 0, 0.7)',
        flex: 6,
        sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
      },
      {
        number: 3,
        color: 'blue',
        innerColor: 'rgba(0, 0, 0, 0.7)',
        flex: 6,
        sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
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
    incrementSequence() {
      this.sequence.push(Math.floor(Math.random() * Math.floor(this.NUMBER_OF_CARDS)));
    },

    smallDelay(ms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });
    },

    async showSequence() {
      const seq = this.sequence;

      for (let i = 0; i < seq.length; i += 1) {
        const card = this.cards[seq[i]];

        card.innerColor = 'rgba(0, 0, 0, 0)';
        card.sound.play();

        // eslint-disable-next-line no-await-in-loop
        await this.smallDelay(1300);

        card.innerColor = 'rgba(0, 0, 0, 0.7)';

        // eslint-disable-next-line no-await-in-loop
        await this.smallDelay(300);
      }

      await this.smallDelay(500);
      this.cardEnabled = true;
    },

    async registerClick(number) {
      this.cardEnabled = false;
      this.cards[number].innerColor = 'rgba(0, 0, 0, 0)';
      this.cards[number].sound.play();
      this.userInput.push(number);
      this.nbrClicks += 1;

      await this.smallDelay(350);

      this.cards[number].innerColor = 'rgba(0, 0, 0, 0.7)';
      this.cardEnabled = true;

      await this.smallDelay(200);


      if (this.compareSequences(this.userInput.length - 1)) {
        // If the user has clicked enough cards
        if (this.nbrClicks === this.sequence.length) {
          this.cardEnabled = false;

          // Deduce from game result
          this.victorySequence();
        }
      } else {
        this.defeatSequence();
      }
    },

    compareSequences(i) {
      return this.userInput[i] === this.sequence[i];
    },

    victorySequence() {
      // If the current score is the highscore
      if (this.level > this.highscore) {
        // Set highscore to current score
        this.highscore = this.level;
      }

      // Alert user
      this.$swal({
        icon: 'success',
        titleText: `Bravo! Vous avez réussi le niveau ${this.level}!`,
      });

      // Set the button's text's value
      this.buttonText = 'Continuer';

      this.userInput = [];
    },

    defeatSequence() {
      // Set start button value
      this.buttonText = 'Recommencer';

      // Alert user
      this.$swal({
        icon: 'error',
        titleText: `Aïe aïe aïe, vous n'avez pas réussi le niveau ${this.level}...`,
      });

      // Set the level to 0
      this.level = 0;

      this.userInput = [];
      this.sequence = [];
    },

    startNewLevel() {
      // Disable user input
      this.cardEnabled = false;
      this.buttonEnabled = false;

      // Setting values
      this.level += 1;
      this.max += 1;
      this.nbrClicks = 0;

      /* LEVEL START */

      // Increment random sequence by one move
      this.incrementSequence();


      // Light up squares according to sequence & enable user input
      this.showSequence();
    },
  },
};
</script>
