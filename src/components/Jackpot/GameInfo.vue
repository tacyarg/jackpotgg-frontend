<template>
  <div class="container">
    <div class="id">GAMEID: {{id}}</div>
    <!-- <div class="Hash">HASH: {{hash}}</div> -->
  </div>
</template>

<script>
export default {
  name: "GameInfo",
  props: ["hash", "id"],
  components: {}
};
</script>

<style scoped>
.container {
  /* height: 100%; */
  color: #39424e;
  font-weight: bolder;
  font-size: 0.7em;
  padding: 20px;
}
</style>
