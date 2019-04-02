<template>
  <div class="entry">
    <div class="top">
      <div class="detail">GAMEID: {{jackpot.id}}</div>
      <div class="detail">HASH: {{jackpot.provable.hash}}</div>
      <div class="detail">WINNING TICKET: {{jackpot.provable.outcome * 100}}%</div>
      <div class="detail">TIME: {{jackpot.updated | dayjs('fromNow') }}</div>
      <div class="detail">VALUE: ${{jackpot.value.toLocaleString('en')}}</div>
    </div>
    <div class="content">
      <div class="players">
        <div
          :class="{'player': true, 'winner': player.id === jackpot.winner}"
          v-for="(player, index) in jackpot.players"
          :key="index"
        >
          <img class="avatar-image" :src="player.image">
          <div class="username">{{ player.name }}</div>
          <div class="odds">{{ calcOdds(bets[player.id].value) }}%</div>
        </div>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in jackpot.items" :key="index">
          <img class="item-image" :src="getImage(item.image)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reduce, groupBy } from "lodash";
export default {
  name: "jackpot",
  props: ["jackpot"],
  computed: {
    winner() {
      return this.jackpot.players.find(player => {
        return player.id === this.jackpot.winner;
      });
    },
    bets() {
      const userBets = groupBy(this.jackpot.bets, "userid");

      return reduce(
        userBets,
        (memo, bets, key) => {
          const bet = bets.reduce(
            (memo, bet) => {
              memo.items = [...memo.items, ...bet.items];
              memo.value += bet.value;
              return memo;
            },
            {
              items: [],
              userid: key,
              value: 0
            }
          );

          memo[key] = bet;
          return memo;
        },
        {}
      );
    }
  },
  methods: {
    getImage(image) {
      return image["300px"] ? image["300px"] : image;
    },
    calcOdds(betValue) {
      const percent = betValue / this.jackpot.value;
      return (percent * 100).toFixed(0);
    }
  }
};
</script>

<style scoped>
.entry {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center; */
  /* width: 100%; */
  padding: 20px;
}

.entry > div {
  padding: 10px;
}

.top {
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.top > div {
  padding: 2px;
}

.detail {
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  /* color: #39424e; */
  font-weight: bolder;
  font-size: 0.7em;
  white-space: nowrap;
}

.detail:hover {
  color: white;
  cursor: pointer;
}

.content {
  background: #1d2125;
}

.players {
  display: flex;
  flex-direction: row;
  padding: 20px;
}

/* .players > div {
  margin-right: 20px;
} */

.player {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
}

.winner {
  border: 1px solid orange;
  background: rgba(255, 165, 0, 0.1);
}

.avatar-image {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.username {
  padding: 10px;
}

.items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.item {
  height: 100px;
  width: 100px;
  margin: 5px;
}

.item-image {
  width: 100%;
  height: 100%;
  /* filter: drop-shadow(0 5px 2px rgba(0, 0, 0, 0.5)) saturate(123%)
    contrast(110%); */
}
</style>
