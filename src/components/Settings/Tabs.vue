<template>
  <div class="tab-container">
    <div class="tab-content">
      <div class="tabs">
        <div
          class="tab"
          :class="{active: isTab('Settings')}"
          @click="changeTab('Settings')"
        >Settings</div>
        <div class="tab">|</div>
        <div class="tab" :class="{active: isTab('Jackpot')}" @click="changeTab('Jackpot')">Jackpot</div>
        <div
          class="tab"
          :class="{active: isTab('Coinflip')}"
          @click="changeTab('Coinflip')"
        >Coinflip</div>
        <div class="tab" :class="{active: isTab('Payouts')}" @click="changeTab('Payouts')">Payouts</div>
        <div class="tab" :class="{active: isTab('Refunds')}" @click="changeTab('Refunds')">Refunds</div>
        <div
          class="tab"
          :class="{active: isTab('Deposits')}"
          @click="changeTab('Deposits')"
        >Deposits</div>

        <div
          class="tab"
          :class="{active: isTab('Withdraws')}"
          @click="changeTab('Withdraws')"
        >Withdraws</div>
      </div>
      <div class="tab-body">
        <component :is="tab" :actions="actions" :user="user"/>
      </div>
    </div>
  </div>
</template>

<script>
import Settings from "@/components/Settings/Tabs/Settings.vue";
import Jackpot from "@/components/Settings/Tabs/Jackpot.vue";
import Coinflip from "@/components/Settings/Tabs/Coinflip.vue";
import Payouts from "@/components/Settings/Tabs/Payouts.vue";
import Refunds from "@/components/Settings/Tabs/Refunds.vue";
import Deposits from "@/components/Settings/Tabs/Deposits.vue";
import Withdraws from "@/components/Settings/Tabs/Withdraws.vue";

export default {
  name: "Tabs",
  props: ["actions", "user"],
  components: {
    Jackpot,
    Coinflip,
    Settings,
    Payouts,
    Refunds,
    Deposits,
    Withdraws
  },
  data() {
    return {
      tab: this.$route.query.tab || "Settings"
    };
  },
  mounted() {},
  methods: {
    isTab(tab) {
      return this.tab === tab;
    },
    changeTab(tab) {
      this.tab = tab;
    }
  }
};
</script>

<style scoped>
.tab-container {
  width: 100%;
}

.tab-content {
  display: flex;
  flex-direction: column;
}

.tabs {
  background: #151a1f;
  width: 100%;
  display: flex;
  color: #615f66;
  padding: 10px;
}

.tab {
  padding: 15px;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}

.tab:hover {
  color: #faa538;
}

.active {
  color: white !important;
}

.tab-body {
  background: #1c2126;
  width: 100%;
}
</style>
