<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/logo.png">
    </div>
    <div class="navbar-content">
      <div class="left">
        <NavButton path="/" :iconSrc="require('@/assets/icons/jackpot.png')" text="Jackpot"/>
        <NavButton
          path="/coinflip"
          :iconSrc="require('@/assets/icons/coinflip.png')"
          text="Coinflip"
        />
      </div>

      <div class="right">
        <div class="social">
          <div class="social-button">
            <img class="social-icon" src="@/assets/discord.png">
          </div>
          <div class="social-button">
            <img class="social-icon" src="@/assets/twitter.png">
          </div>
        </div>

        <div class="online">
          <div class="online-dot"/>
          <div class="online-text">{{onlineCount}} Online</div>
        </div>

        <div v-if="!user" class="login-button" v-on:click="actions.loginOpskins()">Login</div>
        <div v-else class="user-links">
          <div class="user-links-actions">
            <router-link v-if="user" tag="div" to="/settings" class="user-action-button">
              <i :class="['material-icons', isSelected('/settings')]">settings</i>
            </router-link>

            <div class="user-action-button">
              <i class="material-icons">flag</i>
            </div>
            <div class="user-action-button" v-if="widthrawalAvailable" @click="withdraw()">
              <i class="material-icons">priority_high</i>
            </div>
            <div class="user-action-button" @click="logout()">
              <i class="material-icons">exit_to_app</i>
            </div>
            
          </div>
          <!-- <router-link class="right-icon" tag="div" to="/referals">
            <div class="levels">
              <levels class="chart" :chart-data="data"></levels>
            </div>
            <img class="logo-icon" :src="user.avatar">
          </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavButton from "@/components/Navbar/NavButton.vue";
import Levels from "@/components/Levels/Levels.js";
import { map } from "lodash";

export default {
  name: "Nav",
  props: ["actions", "user", "inventory", "state"],
  components: {
    NavButton,
    Levels
  },
  data() {
    return {
      onlineCount: 0,
    };
  },
  mounted() {
    this.onlineCount = this.state.get("users").length;
    this.state.on("online", users => [(this.onlineCount = users.length)]);
  },
  computed: {
    widthrawalAvailable() {
      if (Object.keys(this.inventory).length > 0) return true;
      return false;
    },
    data() {
      return {
        datasets: [
          {
            data: [45, 65],
            backgroundColor: ["#faa538", "#191c21"]
          }
        ]
      };
    }
  },
  methods: {
    toastError(err) {
      return this.$notify({
        group: "foo",
        type: "error",
        title: "Error:",
        text: err || "Error performing action!"
      });
    },
    async withdraw() {
      try {
        const res = await this.actions.withdrawMyInventory();
        console.log(res)
      } catch (e) {
        this.toastError(e);
      }
    },
    isSelected(path) {
      return this.$route.path === path ? "active" : "";
    },
    logout() {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }
};
</script>

<style scoped>
.navbar {
  color: #bbbec2;
  width: 100%;
  height: 122px;
  background-color: #191d22;
  box-shadow: 0px 5px 36px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  user-select: none;
}

.logo {
  display: flex;
  align-items: center;
  min-width: 362px;
  padding: 50px;
  flex-shrink: 0;
}

.logo img {
  height: 30px;
}

.navbar-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.left,
.right {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}

.right {
  justify-content: flex-end;
}

.social {
  display: flex;
}

.social-icon {
  vertical-align: middle;
  height: 30px;
  /* background-color: red; */
}

.social-button {
  cursor: pointer !important;
  color: #475059;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.4em;
}

.online {
  display: flex;
  flex-wrap: nowrap;
  align-self: center;
  text-align: center;
  border: 2px solid #262a2f;
  border-radius: 3px;
  font-size: 0.9em;
  color: #86929d;
  padding: 16px;
  margin: 20px;
}

.online-text {
  white-space: nowrap;
  /* font-weight: bold; */
}

.online-dot {
  align-self: center;
  height: 0.4em;
  width: 0.4em;
  margin: 5px;
  padding: 5px;
  border-radius: 50%;
  background: #faa538;
}

.user-action-button {
  cursor: pointer !important;
  color: #475059;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.4em;
}

.material-icons {
  transition: 0.3s all ease-in-out;
}

.active,
.user-action-button:hover .material-icons {
  color: #faa538;
}

.login-button {
  width: 135px;
  height: 40px;
  padding-top: 8px;
  font-weight: bold;
  border: solid 1px #db9336;
  color: white;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  margin: 20px;
  position: relative;
  z-index: 999;
}

.login-button:before {
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

.login-button:hover:before {
  top: 0;
}

.user-links {
  height: 100%;
  display: flex;
  align-items: center;
}

.user-links-actions {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}

.right-icon {
  height: 100%;
  background-color: #1f242b;
  width: 122px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
}

.logo-icon {
  height: 98px;
  width: 98px;
  border-radius: 50%;
  vertical-align: middle;
}

.levels {
  position: absolute;
  height: 100px;
  width: 100px;
  top: -143px;
}
</style>
