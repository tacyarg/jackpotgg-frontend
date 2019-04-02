<template>
  <div class="container">
    <div class="tabs">
      <div class="tab" :class="{selected: tab == 'Overview'}" @click="tab = 'Overview'">Overview</div>
      <div class="tab" :class="{selected: tab == 'Promotional'}" @click="tab = 'Promotional'">Promotional</div>
      <div class="tab" :class="{selected: tab == 'Users'}" @click="tab = 'Users'">Users</div>
      <div class="tab" :class="{selected: tab == 'Stats'}" @click="tab = 'Stats'">Stats</div>
    </div>
    <users v-if="tab == 'Users'"/>
    <promo v-if="tab == 'Promotional'"/>
  </div>
</template>

<script>
import Users from '@/components/admin/Users.vue'
import Promo from '@/components/admin/Promo.vue'

export default {
  name: 'admin',
  props: ['state', 'actions', 'userState'],
  components: {
    Users,
    Promo
  },
  mounted() {
  },
  data () {
    return {
      tab: 'Overview'
    }
  }
}
</script>

<style scoped>

  .container {
    color: #ffffff;
    position: fixed;
    left: 362px;
    top: 122px;
    right: 0;
    bottom: 0;
    padding: 70px 90px;
    display: flex;
    flex-wrap: wrap;
    background-color: #1d2125;
    align-content: start;
    user-select: none;
  }

  .tabs {
    display: flex;
    font-weight: bold;
    color: #82888e;
    margin-bottom: 45px;
  }

  .tab {
    margin: 0 12.5px;
    transition: 0.2s all ease-in-out;
    cursor: pointer;
  }

  .tab:hover {
    color: #f9a538;
  }

  .selected {
    color: white !important;
  }

</style>
