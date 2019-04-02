<template>
  <div class="container">
    <div class="items-container">
      <div v-for="item in bet.items" v-bind:key="item.id" class="item">
        <img class="item-image" :src="getImage(item.image)">
      </div>
    </div>

    <div class="base">
      <span class="helper"/>
      <div class="name">{{user.name}}</div>
      <div class="value">${{bet.value.toFixed(2)}}</div>
      <div class="percentage">{{percentage.toFixed(2)}}%</div>
      <img class="avatar-image" :src="user.image" :style="{border: '2px solid' + bet.color}">
    </div>
  </div>
</template>

<script>
export default {
  name: "JackpotBet",
  props: ["bet", "user", "percentage"],
  components: {},
  data() {
    return {};
  },
  methods: {
    getImage(image) {
      return image["300px"] ? image["300px"] : image;
    }
  }
};
</script>

<style scoped>
.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.container {
  box-shadow: 0px 5px 36px 0px rgba(0, 0, 0, 0.2);
  transition: all 1s;
  height: 260px;
  width: 260px;
  margin: 0 25px;
  background-color: #222932;
  border-radius: 5px;
  flex-shrink: 0;
}

.items-container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
  max-height: 202px;
  overflow-y: auto;
  padding-left: 10px;
}

.item {
  height: 100px;
  width: 100px;
  margin: 5px;
}

.item-image {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 5px 2px rgba(0, 0, 0, 0.5)) saturate(123%)
    contrast(110%);
}

.base {
  height: 58px;
  background-color: #2b333c;
  width: 100%;
  padding: 10px;
  position: relative;
  border-radius: 0 0 5px 5px;
}

.name {
  display: inline-block;
  vertical-align: middle;
  font-size: 0.8em;
  font-weight: bold;
}

.value {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  line-height: 58px;
  vertical-align: middle;
  font-size: 0.8em;
}

.percentage {
  vertical-align: middle;
  background: #252b33;
  height: 100%;
  padding: 0 10px;
  line-height: 38px;
  border-radius: 5px;
  float: right;
  font-weight: bold;
}

.avatar-image {
  position: absolute;
  height: 50px;
  width: 50px;
  left: -25px;
  top: -25px;
  border-radius: 50%;
}
</style>
