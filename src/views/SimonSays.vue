<template>
  <v-container class="mx-auto" max-width="500" fill-height v-model="level">
    <v-container fuild>
      <v-row dense justify="center">
        <h1>Simon Says</h1>
      </v-row>

      <v-row dense justify="center">
        <h3 class="pt-4"><strong>Règles du jeu :</strong></h3>
      </v-row>

      <v-row dense justify="center">
        <ul class="pt-4">
          <li><p>Pour commencer la partie, cliquer sur le bouton <strong>Nouvelle Partie</strong> ci-dessous.</p></li>
          <li><p>Bien être attentif, et <strong>mémoriser la séquence</strong> de couleurs qui se joue à l'écran.</p></li>
          <li><p>Rejouer la séquence <strong>dans le bon ordre</strong>, en <strong>cliquant sur les bons rectangles</strong>.</p></li>
          <li><p>Si la séquence est bonne, victoire ! Pour <strong>continuer à jouer</strong>, il vous suffira de cliquer sur le bouton <strong>Continuer</strong>.</p>
          <li><p>Sinon, il vous faudra <strong>recommencer de zéro</strong> en cliquant sur le bouton <strong>Recommencer</strong>.</p></li>
        </ul>
      </v-row>

      <v-row dense justify="center">
        <p>Vous pouvez arrêter de jouer <strong>à tout moment</strong>, en cliquant simplement sur la flêche de retour située <strong>en haut à gauche</strong>.</p>
      </v-row>

      <v-row dense justify="center">
        <h2 class="pt-4">Niveau actuel : {{level}}</h2>
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
            @mouseover="changeColorOnHover(card.number)"
            @mouseleave="changeColorOnLeave(card.number)"
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
            @mouseover="changeColorOnHover(card.number)"
            @mouseleave="changeColorOnLeave(card.number)"
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

      <v-row dense justify="center" class="pb-5">
        <v-btn
        color="teal"
        dark
        x-large
        :disabled="!buttonEnabled"
        @click="startNewLevel();">
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

    timeouts: [],
  }),

  methods: {
    changeColorOnHover(number) {
      this.cards[number].innerColor = this.cards[number].color;
    },

    changeColorOnLeave(number) {
      this.cards[number].innerColor = 'rgba(0, 0, 0, 0.7)';
    },

    incrementSequence() {
      this.sequence.push(Math.floor(Math.random() * Math.floor(this.NUMBER_OF_CARDS)));
    },

    smallDelay(ms) {
      return new Promise((resolve) => {
        this.timeouts.push(setTimeout(() => {
          this.timeouts.pop();
          resolve();
        }, ms));
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

      this.buttonEnabled = true;
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

      this.buttonEnabled = true;
    },

    async startNewLevel() {
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


      // Alert user
      await this.$swal({
        icon: 'info',
        titleText: 'La séquence va commencer.',
      });


      await this.smallDelay(800);


      // Light up squares according to sequence & enable user input
      await this.showSequence();


      await this.smallDelay(100);


      // Alert user
      await this.$swal({
        icon: 'info',
        titleText: 'A votre tour !',
      });
    },
  },

  destroyed: () => {
    if (this.timeouts.length > 0) {
      for (let i = 0; i < this.timeouts.length; i += 1) {
        clearTimeout(this.timeouts[i]);
      }
    }
  },
};
</script>
