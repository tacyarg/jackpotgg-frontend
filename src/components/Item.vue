<template>
  <div class="item">
    <img class="item-image" :src="image">
    <div class="value">
      <div class="orange">$</div>
      {{item.price.toFixed(2)}}
    </div>
    <div class="name">
      <div class="type">{{item.type}}</div>
      <div class="skin">{{item.name}}</div>
    </div>
    <div class="rarity" v-bind:style="{ background: item.color}"/>
  </div>
</template>

<script>
export default {
  name: "item",
  props: ["item"],
  computed: {
    image() {
      const { image } = this.item;
      return image["300px"] ? image["300px"] : image;
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.item {
  position: relative;
  /* height: 150px;
    width: 150px; */
  height: 150px;
  width: 150px;
  padding: 10px;
  flex-shrink: 0;
  background: #252b33;
  border-radius: 5px 5px 0 0;
  margin: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.item:hover {
  background-color: #1a1d22;
}

.item-image {
  height: 120px;
  /* filter: drop-shadow(0 5px 2px rgba(0, 0, 0, 0.5)) saturate(123%)
    contrast(110%); */
}

.value {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 0.7em;
  font-weight: bold;
}

.name {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.type {
  color: #afb6bb;
  font-size: 0.7em;
}

.skin {
  font-size: 0.8em;
}

.rarity {
  height: 5px;
  width: 100%;
  position: absolute;
  bottom: -5px;
  border-radius: 0 0 5px 5px;
}

.orange {
  color: #f9a538 !important;
  display: inline;
}
</style>
