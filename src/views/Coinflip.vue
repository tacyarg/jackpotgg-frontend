<template>
  <div class="container">
    <Head :user="user" :coinflips="coinflips" :actions="actions" :state="state"/>
    <Entry v-for="cf in coinflips" v-bind:key="cf.id" :coinflip="cf"/>
  </div>
</template>

<script>
import Head from "@/components/Coinflip/Head.vue";
import Entry from "@/components/Coinflip/ListEntry.vue";

export default {
  name: "coinflip",
  props: ["state", "actions", "user"],
  components: {
    Head,
    Entry
  },
  mounted() {
    this.state.on("coinflips", list => {
      this.coinflips = list.filter(game => game.players.length > 0);
    });
  },
  data() {
    return {
      coinflips: this.state("coinflips").filter(game => game.players.length > 0)
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;
  padding: 40px;
}
</style>
