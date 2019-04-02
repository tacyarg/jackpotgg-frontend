<template>
  <div class="chat">
    <Raffle :actions="actions" :state="state"/>

    <div class="messages" v-chat-scroll="{always: false}">
      <Message
        v-for="(message, index) in messages"
        v-bind:key="index"
        :message="message"
        :color="index"
      />
    </div>

    <ChatInput :authenticated="authenticated" :actions="actions"/>
  </div>
</template>

<script>
import Raffle from "@/components/Chat/Raffle.vue";
import Message from "@/components/Chat/Message.vue";
import ChatInput from "@/components/Chat/ChatInput.vue";

export default {
  name: "Chat",
  components: {
    Raffle,
    Message,
    ChatInput
  },
  props: ["actions", "state", "authenticated"],
  data() {
    return {
      chat: this.state.get("chats")[0]
    };
  },
  computed: {
    messages() {
      return this.chat.messages.filter(msg => msg.user);
    }
  },
  mounted() {
    if (!this.chat.messages) {
      this.chat.messages = [];
    }

console.log(this.chat)

    this.state.on("chat", chat => {
      if (!chat.messages) chat.messages = [];
      this.chat = chat;
    });
  }
};
</script>

<style scoped>
.chat {
  width: 360px;
  flex-shrink: 0;
  background-color: #1d2228;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overflow-wrap: break-word;
}

.msg {
  height: 50px;
}

.inputbox {
  background-color: red;
  height: 100px;
}
</style>
