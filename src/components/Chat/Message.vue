<template>
  <div class="message-container" v-bind:style="{ 'background-color': isColor }">
    <img class="avatar" :src="message.user.avatar" />
    <div class="content">
      <div class="username">
        {{message.user.username}}
        <div class="level">{{message.user.level || 0}}</div>
        <div class="time">{{message.timestamp | dayjs('fromNow') }}</div>
      </div>
      <div class="message">{{message.message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: ['message', 'color'],
  data () {
    return {
      
    }
  },
  computed: {
    isColor() {
        if (this.color % 2) {
          return '#21262d';
        } else {
          return '#1b1f24';
        }
    }    
  }

}
</script>

<style scoped>

  .message-container {
    width: 100%;
    padding: 10px;
    display: flex;
    position: relative;
  }

  .avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .content {
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  .username {
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .time {
    float: right;
    color: #606367;
    text-align: right;
    font-size: 0.7em;
    margin-top: 5px;
  }

  .level {
    margin-left: 10px;
    font-size: 0.8em;
    font-weight: bold;
    display: inline-block;
    color: #ffa600;
  }

  .message {
    color: #929aa5;
  }



</style>
