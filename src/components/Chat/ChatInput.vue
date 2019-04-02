<template>
  <div class="input-container">
    <input type="text" :class="{disabled: !authenticated}" placeholder="Write your message..." v-model="message" @keyup.enter="chat(message)"/>
    <div class="send" :class="{disabled: !authenticated}">
      <span class="helper" />
      <i class="material-icons" @click="chat(message)">send</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatInput',
  props: ['actions', 'authenticated'],
  data() {
    return {
      message: '',
    }
  },
  methods: {
    chat(message) {
      if (message.length < 1) return
      this.actions.chat({ roomid: 'en', message: message }).catch(err => {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error submitting message:',
          text: err,
        })
      })

      this.message = ''
    },
  },
  computed: {},
}
</script>

<style scoped>
.input-container {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
  background-color: #1d2228;
  height: 96px;
  width: 100%;
  padding: 15px;
  user-select: none;
}

input {
  height: 100%;
  width: 100%;
  background: none;
  border: 2px solid;
  border-color: #22272d;
  outline: none;
  font-size: 1em;
  box-shadow: none;
  padding: 0 40px 0 20px;
  color: #8f97a1;
}

input::placeholder {
  color: #474f58;
}

.disabled {
  pointer-events:none;
  opacity: 0.4;
  cursor: default;
}

.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.send {
  position: absolute;
  cursor: pointer;
  right: 7px;
  top: 14px;
  bottom: 14px;
  width: 40px;
  color: #4b5667;
}
</style>
