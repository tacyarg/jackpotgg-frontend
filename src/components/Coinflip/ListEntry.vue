<template>
  <div class="entry">
    <div class="section">
      <img class="avatar" :src="user.image" :style="{borderColor: choice}">
      <div class="value">{{user.name}}</div>
    </div>
    <div class="section">
      <i class="material-icons">timer</i>
      <div class="started">{{coinflip.created | dayjs('fromNow')}}</div>
    </div>
    <div class="section">
      <div class="value">${{coinflip.value.toFixed(2)}}</div>
      <router-link
        v-if="coinflip.bets.length < 2"
        :to="navTo(coinflip.id)"
        tag="div"
        class="button"
      >Join</router-link>
      <router-link v-else :to="navTo(coinflip.id)" tag="div" class="button">{{coinflip.state}}</router-link>
      <!-- <router-link v-else :to="navTo(coinflip.id)" tag="i" class="material-icons">remove_red_eye</router-link > -->
    </div>
  </div>
</template>

<script>
export default {
  name: "coinflipGame",
  props: ["coinflip"],
  computed: {
    choice() {
      return this.coinflip.bets[0].selection == "heads" ? "#faaf40" : "#717a83";
    },
    user() {
      return this.coinflip.players[0];
    }
  },
  data() {
    return {};
  },
  methods: {
    navTo(id) {
      return `/coinflip/${id}`;
    }
  }
};
</script>

<style scoped>
.entry {
  /* border-bottom: 1px solid #52575d; */
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.section {
  display: flex;
  align-items: center;
}

.avatar {
  border: 2px solid snow;
  border-radius: 50%;
  max-height: 50px;
  max-width: 50px;
}

.value {
  padding: 10px;
  font-weight: bold;
  font-size: 1.2em;
}

.material-icons {
  color: #565b61;
  cursor: pointer;
}

.button {
  height: 35px;
  width: 95px;
  border: solid 1px #db9336;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  margin-left: 20px;
  position: relative;
}

.button:before {
  content: "";
  position: absolute;
  background: #db9336;
  bottom: 0;
  left: 0;
  right: 0;
  top: 100%;
  z-index: -1;
  transition: top 0.09s ease-in;
}

.button:hover:before {
  top: 0;
}

.started {
  margin-left: 10px;
  /* font-weight: bold; */
  font-size: 1.1em;
}
</style>
