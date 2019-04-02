<template>
  <div class="coin-container">
    <div class="center">
      <timer class="chart" :chart-data="data"></timer>
      <div class="coin">
        <div class="coin-faces" :style="{ transform: 'rotateY(' + degrees + 'deg)' }">
          <div class="front"></div>
          <div class="back"></div>
        </div>
      </div>
    </div>
    <div class="timer" v-if="coinflip && !coinflip.done && coinflip.state != 'Success'">
      <i class="material-icons">timer</i>
      {{timeleft.toFixed(0)}}s {{coinflip.state}}
    </div>
    <div class="timer" v-else>
      <Button :onClick="back" text="Back"/>
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Coinflip/Timer.js";
import Button from "@/components/Layout/Button.vue";
import { find } from "lodash";

export default {
  name: "coinflipCoin",
  props: ["coinflip", "state"],
  components: {
    Timer,
    Button
  },
  mounted() {

    this.state.on("coinflips", list => {
      var coinflip = list.filter(game => game.id == this.$route.params.id)[0];
      if (!coinflip) return;
      if (coinflip.state == "cooldown" && !this.flipping) {
        var win = find(coinflip.bets, ['id', coinflip.winningBet.betid]).selection;

        if (win == 'heads') {
          this.degrees = 3600 + 360;
        } else {
          this.degrees = 3600 + 180;
        }
        this.flipping = true;
      }
    });
  },
  computed: {
    betValues() {
      return this.coinflip.bets.map(bet => bet.value);
    },
    betSelections() {
      return this.coinflip.bets.map(bet => this.isChoice(bet.selection));
    },
    timeleft() {
      return this.coinflip.timeleft / 1000;
    },
    data() {
      return {
        datasets: [
          {
            data: this.betValues,
            backgroundColor: this.betSelections
          }
        ]
      };
    }
  },
  data() {
    return {
      flipping: false,
      degrees: 0
    };
  },
  methods: {
    back() {
      this.$router.push('/coinflip')
    },
    isChoice(selection) {
      if (selection == "heads") return "#faaf40";
      return "#717a83";
    }
  }
};
</script>

<style scoped>
.coin-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 5%;
  /* background: rebeccapurple; */
}

.center {
  width: 170px;
  height: 170px;
  position: relative;
}

.coin {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  perspective: 1000px;
}

.coin-faces {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 3s ease-in-out;
  transform-style: preserve-3d;
}

.front {
  border-radius: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #faaf40;
  backface-visibility: hidden;
}

.back {
  border-radius: 50%;
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  background: #717a83;
  transform: rotateY(180deg);
}

.chart {
  position: absolute;
  top: -10px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.material-icons {
  color: #faaf40;
  margin-right: 5px;
}

.timer {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
