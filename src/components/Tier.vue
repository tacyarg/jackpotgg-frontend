<template>
  <div class="container">
    <div class="lock" v-if="locked" ><i class="material-icons md-48">lock</i></div>
    <div class="xp">+{{xp}} XP</div>
      <div class="title-container">
        <div class="tier">Tier <div class="orange">{{tier}}</div></div>
        <div class="rewards">REWARDS</div>
      </div>
      <div class="button" :class="{disabled: disabled}">CLAIM {{points}} POINTS</div>
  </div>
</template>

<script>


export default {
  name: 'Tier',
  props: ['tier', 'xp', 'points', 'locked', 'disabled'],
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
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 195px;
    height: 195px;
    border-radius: 5px;
    background-color: #222830;
    box-shadow: 3px 3px 15px 0px rgba(0, 0, 0, 0.25);
    margin-right: 20px;
    user-select: none;
  }

  .lock {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    background: rgba(0, 0, 0, 0.6);
  }

  .xp {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 0.7em;
  }

  .md-48 {
    font-size: 3em;
  }

  .title-container {
    text-align: center;
  }

  .tier {
    font-size: 1.1em;
    font-weight: bold;
  }

  .rewards {
    font-size: 0.7em;
  }

  .orange {
    display: inline;
    color: #faa538;
  }

  .button {
    position: absolute;
    bottom: 20px;
    height: 30px;
    width: 125px;
    background: #4d402d;
    border: 1px solid #faa538;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 0.5em;
    cursor: pointer;
  }

  .disabled {
    opacity: 0.3;
    user-select: none;
    cursor: default;
  }

</style>
