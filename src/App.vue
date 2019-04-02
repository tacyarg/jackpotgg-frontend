<template>
  <div id="app">
    <Nav :actions="actions" :user="user" :state="state" :inventory="inventory"/>
    <div class="app-body">
      <Chat :state="state" :actions="actions" :authenticated="authenticated"/>
      <router-view
        :state="state"
        :actions="actions"
        :authenticated="authenticated"
        :user="user"
        :stats="stats"
      />
    </div>
    <notifications group="foo"/>
    <offer v-if="showOffer" :offer="offer" @close="showOffer = !showOffer"/>
    <deposit
      v-if="depositModal.show"
      :loadInventory="actions[depositModal.loadInventoryAction]"
      :deposit="actions[depositModal.depositAction]"
      :selection="depositModal.selection"
      :gameid="depositModal.gameid"
      :userState="userState"
      @close="closeDepositModal"
    />
  </div>
</template>

<script>
import Nav from "@/components/Navbar/Nav.vue";
import Chat from "@/components/Chat/Chat.vue";
import Deposit from "@/components/Deposit.vue";
import Offer from "@/components/Offer.vue";
import State from "statesync";

export default {
  name: "app",
  props: ["state", "actions", "authenticated", "userState"],
  components: {
    Nav,
    Chat,
    Deposit,
    Offer
  },
  data() {
    return {
      showDeposit: false,
      showCoinflipDeposit: false,
      showBackpack: false,
      showOffer: false,
      offer: null,
      depositModal: {
        show: false,
        loadInventoryAction: null,
        depositAction: null
      },
      user: null,
      inventory: null,
      commands: null,
      stats: null
    };
  },
  mounted() {
    if (!this.userState) {
      return;
    }

    this.user = this.userState.get("me");
    this.userState.on("me", user => {
      this.user = user;
    });

    this.inventory = this.userState.get("inventory");
    this.userState.on("inventory", inventory => {
      this.inventory = inventory;
    });

    this.stats = this.userState.get("stats");
    this.userState.on("stats", stats => {
      this.stats = stats;
    });

    this.commands = this.userState.get("commands");
    this.userState.on("commands", (commands, cmd, key) => {
      this.commands = commands;

      switch (cmd.type) {
        case "vgoDeposit":
          if (!cmd.done) {
            this.offer = cmd;
            this.showOffer = true;
            return;
          }
          if (cmd.reject) this.showToast("error", cmd.reject.message);
          else this.showToast("success", cmd.resolve || "Deposit accepted!");
          this.showOffer = false;
          return;
        default:
          // console.log(cmd.type, cmd);
      }

    });

    this.state.on("depositModal", (state, params) => {
      this.depositModal = params;
    });
    
  },
  methods: {
    showToast(type, text) {
      return this.$notify({
        group: "foo",
        type,
        title: type,
        text
      });
    },
    closeDepositModal() {
      this.depositModal = {
        show: false,
        loadInventoryAction: null,
        depositAction: null
      };
    }
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background: #faa538;
}

* {
  margin: 0;
  padding: 0;
  font-family: "Exo 2", sans-serif;
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.app-body {
  display: flex;
  height: calc(100vh - 122px);
  /* overflow: hidden; */
}
</style>
