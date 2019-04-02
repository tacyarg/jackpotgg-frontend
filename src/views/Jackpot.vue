<template>
  <div class="container">
    <div class="game">
      <GameInfo :hash="jackpot.id" :id="jackpot.id"/>
      <div class="game-container">
        <Main :jackpot="jackpot" :actions="actions" :state="state"/>
        <Spinner :jackpot="jackpot" :state="state"/>
        <Info :jackpot="jackpot" :user="user"/>
      </div>
      <JackpotBets :jackpot="jackpot"/>
    </div>
    <div class="history">
      <div class="history-title">PREVIOUS ROUNDS</div>
      <HistoryEntry v-for="entry in history" :key="entry.id" :jackpot="entry"/>
    </div>
  </div>
</template>

<script>
import {orderBy} from 'lodash'
import GameInfo from "@/components/Jackpot/GameInfo.vue";
import Main from "@/components/Jackpot/Main.vue";
import Spinner from "@/components/Jackpot/Spinner.vue";
import Info from "@/components/Jackpot/Info.vue";
import JackpotBets from "@/components/Jackpot/Betlist.vue";
import HistoryEntry from "@/components/Jackpot/HistoryEntry.vue";

export default {
  name: "jackpot",
  components: {
    GameInfo,
    Main,
    Spinner,
    Info,
    JackpotBets,
    HistoryEntry
  },
  async mounted() {
    this.state.on("jackpot", jackpot => {
      if (!jackpot) return;
      this.jackpot = jackpot;
    });

    this.state.on("jackpotHistory", history => {
      this.history = orderBy(history, 'updated').reverse();
    });

    //TODO: get jackpot history
    // this.history = await this.actions.jackpotHistory();
  },
  props: ["state", "inventory", "actions", "user"],
  data() {
    return {
      jackpot: this.state.get("jackpot"),
      history: orderBy(this.state.get("jackpotHistory"), 'updated').reverse()
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
}

.game {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
}

.game-container {
  width: 100%;
  /* height: 100%; */
  align-items: center;
  overflow-y: hidden;
  display: flex;
  justify-content: space-between;
}

.history {
  /* display: flex; */
  /* justify-content: center; */
}

.history-title {
  padding: 20px;
  display: flex;
  justify-content: center;
  font-size: 1em;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
