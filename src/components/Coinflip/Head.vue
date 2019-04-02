<template>
  <div class="head">
    <coinflip-modal
      v-if="showCreate"
      :toggleSelectionModal="toggleSelectionModal"
      :state="state"
    />
    <div class="body">
      <div class="body-section">
        <div class="active">
          <div class="value">${{active.value}}</div>
          <div class="title">Total Value</div>
        </div>
        <div class="active">
          <div class="value">{{active.amount}}</div>
          <div class="title">Active Games</div>
        </div>
      </div>
      <div v-if="user" class="body-section">
        <div class="active">
          <div class="value">${{myActive.value}}</div>
          <div class="title">My Value</div>
        </div>
        <div class="active">
          <div class="value">{{myActive.amount}}</div>
          <div class="title">My Games</div>
        </div>
        <div class="button" @click="toggleSelectionModal">Create
          <i class="material-icons">add</i>
        </div>
      </div>
      <div v-else class="body-section">
        <div class="subtle-text">login to create a coinflip...</div>
      </div>
    </div>
  </div>
</template>

<script>
import Deposit from "@/components/Deposit.vue";
import CoinflipModal from "@/components/Coinflip/SelectionModal.vue";
import { sumBy } from "lodash";

export default {
  name: "coinflipHead",
  props: ["user", "coinflips", "actions", "state"],
  components: {
    CoinflipModal,
    Deposit
  },
  computed: {
    myActive() {
      if (!this.user)
        return {
          amount: 0,
          value: 0
        };

      const myGames = this.coinflips.filter(game => {
        var ids = game.players.map(user => user.id);
        return ids.includes(this.user.id);
      });

      return {
        amount: myGames.length,
        value: sumBy(myGames, "value").toFixed(2)
      };
    },
    active() {
      return {
        amount: this.coinflips.length,
        value: sumBy(this.coinflips, "value").toFixed(2)
      };
    }
  },
  data() {
    return {
      showCreate: false,
      showDeposit: false
    };
  },
  methods: {
    toggleSelectionModal() {
      this.showCreate = !this.showCreate;
    }
  }
};
</script>

<style scoped>
.head {
  width: 100%;
  height: 95px;
  display: flex;
  border-radius: 5px;
  border: 1px solid #52575d;
  position: relative;
  z-index: 0;
}

.avatar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  z-index: 1;
}

.body {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.body-section {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.active {
  margin: 0 40px;
  text-align: center;
}

.value {
  color: #f9a538;
  font-weight: bold;
  font-size: 1.2em;
  padding: 2px;
}

.title {
  font-size: 0.9em;
}

.button {
  align-self: center;
  height: 50%;
  border-radius: 5px;
  /* background: #f9a538; */
  border: solid 1px #db9336;
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  font-weight: bold;
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

.subtle-text {
  color: #52575d;
}
</style>
