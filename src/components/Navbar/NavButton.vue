<template>
  <router-link :to="path" tag="div" class="nav-link">
    <img v-if="iconSrc" class="game-icon" :src="iconSrc">
    {{text}}
    <div class="active" v-if="isSelected(path)"></div>
  </router-link>
</template>

<script>
export default {
  name: "navButton",
  props: ["text", "iconSrc", "path"],
  methods: {
    isSelected(path) {
      return this.$route.path === path
    }
  }
};
</script>

<style scoped>
.nav-link {
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  user-select: none;
  text-align: center;
  cursor: pointer !important;
  position: relative;
}

.game-icon {
  padding-right: 10px;
  height: 24px;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
}

.active {
  background: #faa538;
  height: 3px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
