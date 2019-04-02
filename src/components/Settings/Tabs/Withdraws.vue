<template>
  <div class="tab-content">
    <comp v-for="command in commands" :key="command.id" :command="command"/>
  </div>
</template>

<script>
import { sortBy } from "lodash";
import comp from "@/components/Settings/Commands/general.vue";

export default {
  name: "refunds",
  props: ["user", "actions"],
  components: {
    comp
  },
  data() {
    return {
      commands: []
    };
  },
  async mounted() {
    const result = await this.actions.myWithdrawHistory();
    this.commands = sortBy(result, "updated").reverse();
  },
  methods: {}
};
</script>

<style scoped>
.tab-content {
  width: 100%;
  padding: 10px;
}
</style>
