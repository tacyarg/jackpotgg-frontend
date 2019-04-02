<template>
  <div class="history-item">
    <div class="history-item-body">
      <div class="items">
        <div class="item" v-for="(item, index) in command.bet.items" :key="index">
          <img :src="getImage(item.image)">
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="time">${{command.bet.value.toFixed(2)}}</div>
      <div class="bottom-divider">|</div>
      <div class="time">{{command.gameid}}</div>
      <div class="bottom-divider">|</div>
      <div class="time">{{command.updated | dayjs('fromNow')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "joinOpenJackpot",
  props: ["command"],
  methods: {
    getImage(image) {
      return image['300px'] ? image['300px'] : image
    }
  }
};
</script>

<style scoped>
.tab-content {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: flex-start;
  padding: 10px;
}

.history-item {
  border-radius: 5px;
  background: #151a1f;
  margin: 10px;
}

.history-item-body {
  display: flex;
  /* flex-wrap: wrap; */
}

.time {
  color: #6b7179;
  font-weight: bold;
}

.items {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
}

.item {
  margin: 5px;
  border-radius: 5px;
  background: #1f252c;
  width: 110px;
  height: 61px;
  position: relative;
}

.item img {
  height: 60px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  position: absolute;
}

.bottom {
  height: 45px;
  background: #15181c;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7em;
  color: #7a818a;
}

.bottom-divider {
  margin-left: 10px;
  margin-right: 10px;
}

.orange {
  color: #faa538;
}
</style>
