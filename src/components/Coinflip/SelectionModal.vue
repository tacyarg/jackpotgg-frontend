<template>
  <div class="container">
    <div class="modal">
      <div class="close">
        <i class="material-icons icon" @click="toggleSelectionModal">close</i>
      </div>
      <div class="body">
        <div :class="isSelected('heads')" @click="selectChoice('heads')"></div>or
        <div
          :style="{background: '#717a83'}"
          :class="isSelected('tails')"
          @click="selectChoice('tails')"
        ></div>
      </div>
      <div class="footer">
        <div class="footer-text">
          Current Selection:
          <span class="footer-selection">{{selection}}</span>
        </div>
        <div :class="canConfirm()" @click="submitSelection">Confirm</div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";

export default {
  name: "coinflipModal",
  props: ["toggleSelectionModal", "state"],
  data() {
    return {
      selection: "none"
    };
  },
  methods: {
    isSelected(selection) {
      return selection == this.selection ? "choice choice-selected" : "choice";
    },
    selectChoice(selection) {
      this.selection = selection;
    },
    canConfirm() {
      return this.selection === "none"
        ? "footer-btn footer-btn-disabled"
        : "footer-btn";
    },
    submitSelection() {
      if (this.selection == "none") return;
      this.toggleSelectionModal();
      this.state.set("depositModal", {
        show: true,
        loadInventoryAction: "scanMyVgoInventoryByOpskinsId",
        depositAction: "depositCreateAndJoinCoinflip",
        selection: this.selection
      });
    }
  }
};
</script>

<style scoped>
.container {
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 20;
}

.modal {
  border-radius: 5px;
  overflow: hidden;
  width: 500px;
  height: 275px;
  background: #161c21;
  position: relative;
}

.close {
  position: absolute;
  top: 8px;
  right: 10px;
  cursor: pointer;
}

.icon {
  font-size: 0.9em !important;
}

.body {
  display: flex;
  height: 175px;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.choice {
  background: #faaf40;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 0 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  opacity: 0.1;
}

.choice-selected {
  opacity: 1;
}

.footer {
  background: #1a1f26;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.footer-text {
  color: rgb(94, 94, 94);
}

.footer-selection {
  padding: 5px;
  color: white;
}

.footer-btn {
  font-weight: bold;
  border-radius: 5px;
  background: #f9a538;
  align-items: center;
  padding: 8px;
  cursor: pointer;
}

.footer-btn-disabled {
  background: #533a18;
}
</style>
