<template>
  <div class="spinner-container">
    <div class="spinner-wrapper">
      <transition name="fade">
        <div v-if="isState('cooldown')" class="pointer"/>
      </transition>

      <donut-chart
        class="spinner"
        :style="{transition: `all ${spinDuration}ms ease`, transform:`rotate(${deg}deg)`}"
        v-if="jackpot.id"
        :chart-data="data"
      />

      <div class="spinner-inside">
        <div class="inside-info">
          <div class="value">
            ${{jackpot.value.toFixed(2)}}
            <div class="spinner-text">Current Value</div>
          </div>

          <div class="value">
            <div v-if="(jackpot.timeleft /1000) > 1">{{(jackpot.timeleft / 1000).toFixed(0)}}s</div>
            <div class="spinner-text">{{jackpot.state}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DonutChart from "@/components/Jackpot/DonutChart.js";
import { random, find } from "lodash";

export default {
  name: "Spinner",
  props: ["jackpot", "state"],
  components: {
    DonutChart
  },
  data() {
    return {
      jackpotData: null,
      speed: 2,
      deg: 0,
      spinDuration: 3,
      winner: {},
      spinning: false,
      winningBet: null
    };
  },
  computed: {
    data() {
      var values = [];
      var colors = [];
      this.jackpot.bets.forEach(bet => {
        values.push(bet.value);
        colors.push(bet.color);
      });
      if (this.winningBet) {
        values = [this.winningBet.value];
        colors = [this.winningBet.color];
      }
      return {
        datasets: [
          {
            data: values,
            backgroundColor: colors
          }
        ]
      };
    }
  },
  mounted() {
    this.state.on("jackpot", this.handleJackpotUpdate);
  },
  methods: {
    isState(state) {
      if (!this.jackpot) return;
      return this.jackpot.state === state;
    },
    handleJackpotUpdate(jackpot) {
      if (!jackpot) return;
      const {
        winningBet,
        winner,
        bets,
        state,
        config,
        provable,
        timeleft
      } = jackpot;

      switch (state) {
        case "open":
          this.spinDuration = 0;
          this.deg = 0;
          this.winningBet = null;
          break;
        case "draw":
          this.spinning = false;
          this.spinDuration = config.drawDuration;
          this.deg = -90;
          break;
        case "cooldown":
          if (timeleft < 5000) return;
          if (this.spinning) return;

          const duration =
            timeleft < config.cooldownDuration
              ? timeleft / 2
              : config.cooldownDuration / 2;

          this.spinning = true;
          this.winner = winner;
          this.spinDuration = duration;
          this.deg = provable.outcome * -360 + 3600;

          setTimeout(() => {
            return this.revealWinner(winningBet);
          }, duration + 2000);
          break;
      }
    },
    revealWinner(winningBet) {
      this.spinDuration = 0;
      this.deg = 0;
      this.winningBet = winningBet;
    }
  }
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
}

.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: relative;
}

.pointer {
  position: absolute;
  top: 20px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid white;
}

.spinner {
  display: flex;
  align-items: center;
}

.spinner-inside {
  position: absolute;
  margin: auto;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.inside-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: space-between;
  padding: 10px;
}

.value {
  padding: 20px;
  font-size: 1.8em;
  font-weight: bold;
  text-align: center;
}

.spinner-text {
  font-size: 0.7em;
  font-weight: normal;
  color: #45474b;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
