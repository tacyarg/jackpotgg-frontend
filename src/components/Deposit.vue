<template>
  <div class="container" v-on:click.self="close">
    <div class="modal">
      <div class="head">
        <div class="left">
          <div class="title">
            Select the skins you want to bet and confirm your selection at the
            bottom!
          </div>
          <div class="sub-title">You need to deposit at least
            <div class="orange">$1.00</div>
          </div>
        </div>
        <div class="right">
          <div class="value">Total Inventory Value:
            <div class="orange">{{total}}</div>
          </div>
          <div @click="setUrl" class="trade-url">Update trade URL</div>
        </div>
      </div>

      <div class="main">
        <transition name="fade">
          <div class="loading" v-if="loading">
            <img class="icon animated" src="@/assets/icons/logo.png">
          </div>
        </transition>
        <div class="items" v-if="!loading">
          <item
            v-for="(item, index) in sort"
            v-bind:key="index"
            :item="item"
            :class="{selected: isSelected(item.id)}"
            @click.native="select(item)"
          />
          <div class="ghost"></div>
          <div class="ghost"></div>
          <div class="ghost"></div>
          <div class="ghost"></div>
        </div>
      </div>

      <div class="footer">
        <div class="split"/>
        <div class="left">
          <input class="search" placeholder="Search for an item..." v-model="searchTerm">
          <div class="sort" @click="reversed = !reversed">
            High to Low
            <i v-if="reversed" class="material-icons down">keyboard_arrow_down</i>
            <i v-else class="material-icons down">keyboard_arrow_up</i>
          </div>
        </div>
        <div class="right">
          <div class="button" @click="startDeposit()">Deposit {{selectedTotal}}</div>
          <div class="cancel-button" @click="close">Cancel</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sumBy, sortBy, filter, includes, findIndex, map } from "lodash";
import Item from "@/components/Item.vue";

export default {
  name: "deposit",
  props: ["loadInventory", "deposit", "userState", "selection", "gameid"],
  data() {
    return {
      loading: true,
      items: [],
      selected: [],
      searchTerm: "",
      reversed: true,
      depositid: ""
    };
  },
  components: {
    Item
  },
  computed: {
    total: function() {
      return sumBy(this.items, "price").toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    },
    search: function() {
      return this.items.filter(item => {
        return includes(item.name.toLowerCase(), this.searchTerm);
      });
    },
    sort: function() {
      var sorted = sortBy(this.search, ["item", "price"]);
      if (this.reversed) sorted.reverse();
      return sorted;
    },
    selectedTotal: function() {
      return sumBy(this.selected, "price").toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    }
  },
  mounted() {
    const { loadInventory } = this;

    return loadInventory().then(items => {
      console.log(items)
      this.loading = false;
      this.items = items;
    });
  },
  methods: {
    toastError(err) {
      return this.$notify({
        group: "foo",
        type: "error",
        title: "Error:",
        text: err || "Error performing action!"
      });
    },
    close() {
      this.$emit("close");
    },
    setUrl() {
      this.$router.push({ name: "settings", query: { tab: "Settings" } });
      this.$emit("close");
    },
    isSelected(id) {
      return this.selected.find(item => item.id === id);
    },
    select(item) {
      const found = this.selected.find(selected => selected.id === item.id);
      if (!found) {
        this.selected.push(item);
      } else {
        const index = findIndex(
          this.selected,
          selected => selected.id == item.id
        );
        this.selected.splice(index, 1);
      }
    },
    async startDeposit() {
      if (this.selectedTotal < 1) {
        return this.toastError("You need to deposit at least $1.00!");
      }

      try {
        const params = {
          gameid: this.gameid,
          itemids: map(this.selected, "id"),
          selection: this.selection,
          gameid: this.gameid
        };

        console.log(params);

        const res = await this.deposit(params);

        this.userState.set("offer", { show: true, id: res.id });
        this.close();
      } catch (e) {
        this.toastError(e);
      }
    }
  }
};
</script>

<style scoped>
.container {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  display: flex;
  justify-content: center;
  user-select: none;
  z-index: 99999;
  transition: opacity 0.3s ease;
}

.modal {
  border-radius: 5px;
  overflow: hidden;
  width: 80%;
  max-width: 1000px;
  background: #20252a;
}

.head {
  background: #1c1f23;
  height: 95px;
  width: 100%;
  padding: 0 50px;
  display: flex;
  align-items: center;
}

.left {
  flex-grow: 1;
}

.right {
  text-align: right;
  flex-grow: 1;
}

.title {
  font-weight: bold;
}

.sub-title {
  color: #747a82;
  font-size: 0.8em;
}

.value {
  font-weight: bold;
  color: #747a82;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.trade-url {
  cursor: pointer;
  color: #747a82;
  font-size: 0.8em;
  text-decoration: underline;
  margin-top: 5px;
}

.trade-url:hover {
  color: white;
}

.main {
  width: 100%;
  height: 500px;
  /* padding: 0 90px; */
  overflow-y: auto;
}

.footer {
  height: 95px;
  width: 100%;
  padding: 40px;
  position: relative;
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
}

.split {
  height: 1px;
  background: #2a3036;
  position: absolute;
  top: 0;
  left: 50px;
  right: 50px;
}

input {
  background: #1c1e22;
  border-radius: 5px;
  border: 2px solid #2b333b;
  outline: none;
  height: 40px;
  color: #949ba3;
  font-weight: bold;
  padding: 0 20px;
}

.search {
  width: 325px;
  margin-right: 22px;
  transition: 0.2s all ease-in-out;
}

.search:focus {
  border-color: rgba(249, 165, 56, 0.4);
}

.sort {
  width: 130px;
  user-select: none;
  cursor: pointer;
  background: #1c1e22;
  border-radius: 5px;
  border: 2px solid #2b333b;
  outline: none;
  height: 40px;
  color: #949ba3;
  line-height: 35px;
  font-size: 0.7em;
  font-weight: bold;
  padding: 0 20px;
  position: relative;
  display: inline-block;
  transition: 0.2s all ease-in-out;
}

.sort:hover {
  border-color: rgba(249, 165, 56, 0.4);
}

.down {
  position: absolute;
  right: 10px;
  top: 7px;
}

.button {
  /* background: #4c402e; */
  border-radius: 5px;
  height: 45px;
  border: 1px solid #f9a438;
  font-weight: bold;
  font-size: 1.1em;
  line-height: 41px;
  display: inline-block;
  padding: 0 35px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  z-index: 1;
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

.cancel-button {
  transition: 0.2s all ease-in-out;
  background: #1a1d22;
  border-radius: 5px;
  height: 47px;
  border: 2px solid #2b333d;
  font-weight: bold;
  font-size: 1.1em;
  line-height: 43px;
  display: inline-block;
  padding: 0 35px;
  margin-left: 20px;
  cursor: pointer;
}

.cancel-button:hover {
  background: #2b333d;
}

.orange {
  color: #f9a538 !important;
  display: inline;
}

.icon {
  height: 100px;
  -webkit-animation-name: bounce;
  animation-name: bounce;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}
@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-5px);
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.loading {
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}

.items {
  height: 100%;
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  overflow-y: auto;
}

.selected {
  background: rgba(249, 165, 56, 0.4) !important;
  border: 1px solid rgba(249, 165, 56, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 1);
}

.ghost {
  height: 0;
  width: 162px;
  /* flex-grow: 1; */
  flex-shrink: 0;
  margin: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
