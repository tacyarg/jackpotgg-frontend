<template>
  <div class="deposit">
    <Button :onClick="openVgoDeposit" text="Deposit"/>
    <Button :onClick="openBackpackDeposit" text="BP Deposit"/>
    <div class="info">Min Deposit Value:
      <div class="orange">$0.5</div>
    </div>
    <div class="info">Max Items Per Bet:
      <div class="orange">15</div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layout/Button.vue";

export default {
  name: "MainJackpot",
  props: ["actions", "jackpot", "state"],
  components: {
    Button
  },
  methods: {
    async getBackpack() {
      return this.state.get("inventory");
    },
    openVgoDeposit() {
      this.state.set("depositModal", {
        show: true,
        loadInventoryAction: "scanMyVgoInventoryByOpskinsId",
        depositAction: "depositAndJoinJackpot"
      });
    },
    openBackpackDeposit() {
      this.state.set("depositModal", {
        show: true,
        loadInventoryAction: "myInventory",
        depositAction: "joinJackpot"
      });
    }
  },
  mounted() {},
  data() {
    return {};
  }
};
</script>

<style scoped>
.deposit {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.info {
  text-align: center;
  padding: 5px;
}

.orange {
  color: #f9a538;
  display: inline;
}

.button {
  width: 135px;
  font-weight: bold;
  border: solid 1px #db9336;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  margin: 0 auto;
  margin-bottom: 10px;
  transition: all 1s;
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
</style>
