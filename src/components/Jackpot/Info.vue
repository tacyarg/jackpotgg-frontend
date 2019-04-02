<template>
  <div class="stats">
    <div class="stat">
      <div class="amount">{{ jackpot.players.length }}</div>
      <div class="type">Players</div>
    </div>
    <div class="stat">
      <div class="amount">{{ jackpot.items.length }}/50</div>
      <div class="type">Items</div>
    </div>
    <div class="stat">
      <div class="amount">{{ betChance }}%</div>
      <div class="type">Chance</div>
    </div>
  </div>
</template>

<script>
import { sumBy } from "lodash";

export default {
  name: "gameinfo",
  props: ["jackpot", "user"],
  mounted() {},
  computed: {
    betChance() {
      if (!this.user) return 0;
      const userBets = this.jackpot.bets.filter(
        bet => bet.userid == this.user.id
      );
      if (userBets.length < 1) return 0;
      return ((sumBy(userBets, "value") / this.jackpot.value) * 100).toFixed(0);
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.stats {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.stat {
  text-align: center;
}

.amount {
  font-weight: bold;
  font-size: 1.3em;
  margin-bottom: 5px;
}

.type {
  font-size: 0.8em;
}
</style>
