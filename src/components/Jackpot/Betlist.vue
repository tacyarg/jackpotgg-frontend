<template>
  <transition-group class="bets" name="list-complete" tag="div">
    <jackpot-bet
      v-for="(bet, index) in jackpot.bets"
      v-bind:key="index"
      :bet="bet"
      :user="findPlayer(bet.userid)"
      :percentage="getPercentage(bet.value)"
    />
  </transition-group>
</template>

<script>
import JackpotBet from "@/components/Jackpot/Bet.vue";
export default {
  name: "JackpotBets",
  props: ["jackpot"],
  components: {
    JackpotBet
  },
  methods: {
    getPercentage(value) {
      var total = this.jackpot.value;
      return (value / total) * 100;
    },
    findPlayer(userid) {
      return this.jackpot.players.find(player => {
        return player.id === userid;
      });
    }
  }
};
</script>

<style scoped>
.bets {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  /* box-shadow: 0px 5px 36px 0px rgba(0, 0, 0, 0.5); */
  display: flex;
  background: #1d2125;
  width: 100%;
  padding: 20px;
  overflow-x: scroll;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
