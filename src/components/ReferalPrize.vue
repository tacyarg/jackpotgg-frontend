<template>
  <div class="container">
    <div class="name">{{name}}</div>
    <div class="wear">({{wear}})</div>
    <img :src="image" />
    <div class="button">{{price}} COINS</div>
  </div>
</template>

<script>


export default {
  name: 'Tier',
  props: ['price', 'image', 'name', 'wear'],
  data () {
    return {
    }
  },
  mounted() {
  },
}
</script>

<style scoped>

  .container {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 225px;
    width: 175px;
    border-radius: 5px;
    border: 2px solid #2b333c;
    margin-right: 20px;
    user-select: none;
    flex-shrink: 0;
  }

  .name {
    position: absolute;
    top: 15px;
    left: 15px;
    font-weight: bold;
    font-size: 1em;
  }

  .wear {
    position: absolute;
    top: 35px;
    left: 15px;
    font-size: 0.5em;
  }

  img {
    height: 125px;
  }

  .button {
    position: absolute;
    bottom: 15px;
    height: 35px;
    width: 95px;
    background: #faa538;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 0.7em;
  }

  

</style>
