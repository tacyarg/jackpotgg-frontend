<template>
  <div class="history-item">
    <div class="prop">
      ID:
      <span class="value orange">{{command.id}}</span>
    </div>
    <div v-if="command.itemids" class="prop">
      Itemids:
      <span class="value">{{cleanItemids(command.itemids)}}</span>
    </div>
    <div class="prop">
      State:
      <span :class="['value', isError(command.state)]">{{command.state}}</span>
    </div>
    <div class="prop">
      State History:
      <span class="value">{{cleanHistory(command.history)}}</span>
    </div>
    <!-- <div class="prop">
      Type:
      <span class="value orange">{{command.type}}</span>
    </div>-->
    <div v-if="command.value" class="prop">
      Value:
      <span class="value">${{command.value.toFixed(2)}}</span>
    </div>
    <div class="prop">
      Message:
      <span class="value">{{command.message}}</span>
    </div>

    <div v-if="command.reject" class="prop">
      Error Message:
      <span class="value red">{{command.reject.message}}</span>
    </div>

    <div class="prop">
      Created:
      <span class="value">{{command.created | dayjs('fromNow')}}</span>
    </div>
    <div class="prop">
      Last Updated:
      <span class="value">{{command.updated | dayjs('fromNow')}}</span>
    </div>
  </div>
</template>

<script>
import {} from "lodash";
export default {
  name: "payoutItems",
  props: ["command"],
  methods: {
    isError(state) {
      return state === "Error" ? "red" : "green";
    },
    cleanItemids(ids) {
      return ids.toString();
    },
    cleanHistory(history) {
      history = history.map(row => row.state);
      return history.toString();
    }
  }
};
</script>

<style scoped>
.history-item {
  border-radius: 5px;
  background: #151a1f;
  margin: 10px;
  padding: 10px;
}

.prop {
  color: #6b7179;
  font-weight: bold;
}

.value {
  color: white;
  font-weight: 500;
}

.orange {
  color: #faa538;
}

.red {
  color: red;
}

.green {
  color: lawngreen;
}
</style>
