<template>
  <div class="button" @click.self="onClick">{{text}}</div>
</template>

<script>
export default {
  name: "Tier",
  props: ["text", "onClick"]
};
</script>

<style scoped>
.button {
  width: 135px;
  font-weight: bold;
  border: solid 1px #db9336;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  margin: 0 auto;
  margin-bottom: 10px;
  transition: all 1s;
  position: relative;
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
</style>
