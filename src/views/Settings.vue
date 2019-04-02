<template>
  <div class="container" v-if="user">
    <div class="userinfo">
      <div class="userinfo-content">
        <img class="avatar" :src="user.avatar">
        <div class="userinfo-value username">{{user.username}}</div>
        <div class="userinfo-value steamid">Steam ID:
          <div class="orange">{{user.steamid}}</div>
        </div>
      </div>
    </div>
    <div class="stats" v-if="stats">
      <div class="stats-content">
        <div class="stat">
          <div class="title">
            <div class="stat-value">
              <div class="orange">$</div>
              {{stats.valueBet.toLocaleString()}}
            </div>
            <div class="stat-title">Total Wagered</div>
          </div>
        </div>
        <div class="stat">
          <div class="title">
            <div class="stat-value">
              <div class="orange">$</div>
              {{(stats.valueWon - stats.valueBet).toLocaleString()}}
            </div>
            <div class="stat-title">Net Profit</div>
          </div>
        </div>
        <div class="stat">
          <div class="title">
            <div class="stat-value">
              <div class="orange">$</div>
              {{stats.valueWon.toLocaleString()}}
            </div>
            <div class="stat-title">Total Won</div>
          </div>
        </div>
      </div>
    </div>
    <tabs :actions="actions" :user="user"/>
  </div>
</template>

<script>
import Tabs from "@/components/Settings/Tabs.vue";

export default {
  name: "Settings",
  props: ["actions", "authenticated", "user", "stats"],
  components: {
    Tabs
  },
  data() {
    return {
    };
  },
  beforeMount() {
    if (!this.authenticated) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
}

.userinfo {
  padding: 10px;
}

.userinfo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  border-radius: 50%;
  border: 3px solid #faa538;
}

.userinfo-value {
  padding: 5px;
}

.username {
  font-size: 1.2em;
}

.steamid {
  color: #7d838b;
}

.stats {
  width: 100%;
}

.stats-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.stat {
  margin: 20px;
  padding: 40px;
  flex-grow: 1;
  border: 2px solid #2b333c;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  text-align: center;
}

.stat-value {
  font-size: 1.8em;
  /* padding-bottom: 10px; */
}

.stat-title {
  color: #959aa0;
}

.orange {
  display: inline;
  color: #faa538;
}
</style>
