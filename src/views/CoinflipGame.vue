<template>
  <div class="container">
    <bet :state="state" :bet="coinflip.bets[0]" :coinflip="coinflip" :user="user"/>
    <coin :state="state" :coinflip="coinflip"/>
    <bet :state="state" :bet="coinflip.bets[1]" :coinflip="coinflip" :joined="joined"/>
  </div>
</template>

<script>
import Bet from "@/components/Coinflip/Bet.vue";
import Coin from "@/components/Coinflip/Coin.vue";
import { find } from "lodash";

export default {
  name: "game",
  props: ["state", "actions", "user"],
  components: {
    Bet,
    Coin
  },
  computed: {
    joined() {
      if (!this.user) return false;
      return find(this.coinflip.players, ['id', this.user.id]);
      
    }
  },
  mounted() {
    this.actions.getCoinflip({gameid: this.$route.params.id}).then(coinflip => {
      this.coinflip = coinflip
      if (coinflip.done) return;

      this.state.on("coinflips", list => {
        var thisCoin = list.filter(game => game.id == this.$route.params.id)[0];
        if (!thisCoin) return;
        this.coinflip = thisCoin;
      });

    }).catch(err => {
      return console.log(err)
    })

  },
  data() {
    return {
      coinflip: {state: null, bets: []}
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  flex-direction: row;
}
</style>
