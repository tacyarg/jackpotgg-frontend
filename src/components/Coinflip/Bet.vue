<template>
  <div class="wrapper">
    <div class="bet" v-if="bet">
      <div class="bet-head">
        <div class="user">
          <img :src="user.image" :style="{borderColor: choice}">
          <div class="username">{{user.name}}</div>
        </div>
        <div class="info">
          <div class="value">${{total}}</div>
          <div class="value">{{percentage}}%</div>
        </div>
      </div>
      <div class="items">
        <div class="item" v-for="item in bet.items" v-bind:key="item.id">
          <img :src="item.image">
        </div>
      </div>
    </div>
    <div class="bet" v-else>
      <Button v-if="!joined" :onClick="openVgoDeposit" text="Join Game"/>
      <Button class="disabled" v-else text="Waiting"/>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layout/Button.vue";
import { sumBy } from "lodash";
export default {
  name: "coinflipBet",
  props: ["bet", "coinflip", "state", "joined"],
  components: { Button },
  data() {
    return {};
  },
  computed: {
    choice() {
      if (this.bet.selection == "heads") return "#faaf40";
      return "#717a83";
    },
    total() {
      return sumBy(this.bet.items, "price").toFixed(2);
    },
    user() {
      return this.findPlayer(this.bet.userid);
    },
    percentage() {
      return this.getPercentage(this.bet.value).toFixed(2);
    }
  },
  methods: {
    getPercentage(value) {
      var total = this.coinflip.value;
      return (value / total) * 100;
    },
    findPlayer(userid) {
      return this.coinflip.players.find(player => {
        return player.id === userid;
      });
    },
    findAvailableSelection() {
      return this.coinflip.config.selections.find(selection => {
        return selection != this.coinflip.bets[0].selection;
      });
    },
    openVgoDeposit() {
      this.state.set("depositModal", {
        show: true,
        loadInventoryAction: "scanMyVgoInventoryByOpskinsId",
        depositAction: "depositAndJoinCoinflip",
        gameid: this.coinflip.id,
        selection: this.findAvailableSelection()
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
}

.bet {
  display: flex;
  flex-direction: column;
  align-self: center;
}

.bet-head {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.user {
  padding: 10px;
}

.user img {
  border: 2px solid snow;
  border-radius: 50%;
  max-width: 100px;
  max-height: 100px;
}

.username {
  font-size: 1.2em;
  text-align: center;
  font-weight: bold;
}

.info {
  padding: 10px;
  text-align: center;
  color: #687179;
}

.value {
  padding: 5px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  overflow-y: scroll;
  background: #1d2227;
}

.item {
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px;
  margin: 5px;
}

.disabled {
  pointer-events: none;
  color: #687179;
  border-color: #687179;
}

.item img {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 5px 2px rgba(0, 0, 0, 0.5)) saturate(123%)
    contrast(110%);
}
</style>
