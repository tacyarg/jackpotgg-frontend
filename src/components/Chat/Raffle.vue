<template>
  <div v-if="raffle" class="raffle-container">
    <div class="raffle">
      <div class="pool">
        <div class="item">
          <!-- <img
            class="item-image"
            src="https://files.opskins.media/file/vgo-img/item/usp-s-nighthawk-field-tested-600.png"
          > -->
          <img class="item-image" :src="item.image['300px']">
        </div>
        <div class="price">${{item.price.toFixed(2)}}</div>
      </div>

      <div class="content">
        <div class="title">ITEM RAFFLE</div>
        <div class="entries">
          <div class="orange">1 </div>key is equal to
          <div class="orange">one </div>entry.
        </div>
        <div class="button" @click="openDeposit">Deposit</div>
      </div>
    </div>
    <div class="progress">
      <div class="time">{{raffle.timeleft/1000}}s</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Raffle",
  props: ["actions", "state"],
  computed: {
    item() {
      if (!this.raffle) return;
      return this.raffle.pool[0];
    }
  },
  data() {
    return {
      raffle: null
    };
  },
  async mounted() {
    const [raffle] = await this.actions.listOpenRaffles();
    console.log(raffle);
    this.raffle = raffle;
  },
  methods: {
    openDeposit() {
      this.state.set("depositModal", {
        show: true,
        loadInventoryAction: "scanMyVgoInventoryByOpskinsId",
        depositAction: "joinItemRaffle",
        gameid: this.raffle.id
      });
    }
  }
};
</script>

<style scoped>
.raffle-container {
  color: #abb3be;
  background-color: #262b33;
  padding: 8px;
  display: flex;
  flex-direction: column;
}

.raffle {
  background-color: #262d35;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.pool {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.item {
  width: 100px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 5px;
}

.item-image {
  width: 100%;
  filter: drop-shadow(0 5px 2px rgba(0, 0, 0, 0.5)) saturate(123%)
    contrast(110%);
}

.price {
  padding: 10px;
  align-self: center;
  font-size: 0.7em;
  font-weight: bold;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.title {
  font-weight: bold;
}

.entries {
  padding: 5px;
  font-size: 0.8em;
}

.button {
  width: 120px;
  font-weight: bold;
  border: solid 1px #db9336;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  margin: 5px;
  margin-bottom: 10px;
  transition: all 1s;
  position: relative;
  z-index: 999;
}

.button:hover {
  color: white;
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

.orange {
  color: #f9a538 !important;
  display: inline;
}

.progress {
  width: 100%;
  height: 5px;
  background: #f9a538;
  border-radius: 2.5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time {
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  margin-top: -3px;
}
</style>
