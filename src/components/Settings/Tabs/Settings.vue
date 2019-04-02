<template>
  <div class="tab-content">
    <div class="row">
      <input type="text" v-model="user.expresstradeurl" placeholder="trade Url">
      <div class="button" @click="setURL()">Set URL</div>
      <a
        class="link"
        href="https://trade.opskins.com/settings"
        target="_blank"
      >Where do I find this?</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings",
  props: ["actions", "user"],
  data() {
    return {
    };
  },
  methods: {
    showError(err) {
      this.$notify({
        group: "foo",
        type: "error",
        title: "Error",
        text: err
      });
    },
    showSuccess(msg) {
      this.$notify({
        group: "foo",
        type: "success",
        title: "Success",
        text: msg || "Your request has been submited!"
      });
    },
    setURL() {
      return this.actions
        .setMyExpressTradeUrl({ expresstradeurl: this.user.expresstradeurl })
        .then(this.showSuccess("Your TradeURL has been updated!"))
        .catch(this.showError);
    }
  }
};
</script>

<style scoped>
.tab-content {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10px;
}

.row {
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
}

input {
  height: 45px;
  width: 360px;
  background: none;
  border: 1px solid;
  border-color: #4e555d;
  border-radius: 3px;
  outline: none;
  font-size: 1em;
  box-shadow: none;
  padding: 0 0 0 10px;
  color: #8f97a1;
  margin: 0 10px;
}

input::placeholder {
  color: #666b70;
}

.button {
  height: 45px;
  width: 100px;
  /* background: #faa538; */
  border: solid 1px #db9336;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  margin: 10px;
  position: relative;
  font-weight: bold;
  z-index: 999;
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

.link {
  margin: 0 10px;
  cursor: pointer;
  color: white;
  text-decoration: none;
}
</style>
