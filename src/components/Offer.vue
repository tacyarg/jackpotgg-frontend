<template>
  <div class="container" v-on:click.self="close">
    <div class="offer">
      <div v-if="!offer.offerurl" class="title">Creating Offer</div>
      <template v-else>
        <div class="title">Offer Sent!</div>
        <div class="id">ID: {{offer.id}}</div>
        <a v-on:click.self="openWindow" target="_blank" class="button">View</a>
      </template>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
export default {
  name: "offer",
  props: ["offer"],
  methods: {
    openWindow() {
      window.open(this.offer.offerurl,'popup','width=1024,height=768,scrollbars=no,resizable=no')
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.container {
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  display: flex;
  justify-content: center;
  user-select: none;
  z-index: 99999;
}

.offer {
  border-radius: 5px;
  overflow: hidden;
  width: 500px;
  height: 260px;
  background: #20252a;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}

.title {
  font-weight: bold;
  font-size: 1.6em;
  margin: 20px 0;
}

.id {
  font-weight: bold;
  font-size: 1.3em;
  width: 100%;
  text-align: center;
  margin: 20px 0;
}

.button {
  color: white;
  text-decoration: none;
  border-radius: 5px;
  height: 45px;
  border: 1px solid #f9a438;
  font-weight: bold;
  font-size: 1.1em;
  line-height: 41px;
  padding: 0 20px;
  text-align: center;
  cursor: pointer;
  margin: 20px 0;
  transition: all 0.2s ease-in-out;
}

.button:hover {
  background: #f9a438;
}
</style>
