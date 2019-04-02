<template>
  <div class="referals">
    <referal/>
    <levels :tier="levels.tier" :current="levels.current" :total="levels.total"/>
    <div class="tiers">
      <tier
        v-for="tier in tiers"
        v-bind:key="tier.tier"
        :tier="tier.tier"
        :xp="tier.xp"
        :points="tier.points"
        :locked="tier.locked"
        :disabled="tier.disabled"
      />
    </div>
    <div class="stats">
      <div class="stat">USERS DEPOSITED&nbsp;
        <div class="orange">${{stats.totalValue}}</div>, YOUR CUT IS&nbsp;
        <div class="orange">{{stats.totalPoints}} POINTS</div>
      </div>
      <div class="stat middle">YOU'VE REFERRED&nbsp;
        <div class="orange">${{stats.referredPlayers}}</div>, YOUR CUT IS&nbsp;
        <div class="orange">${{stats.playerCut}}</div>
      </div>
      <div class="stat">YOUR BALANCE IS&nbsp;
        <div class="orange">${{stats.balance}}</div>&nbsp;POINTS
      </div>
    </div>
    <div class="tiers">
      <referal-prize
        v-for="(item, index) in prizes"
        v-bind:key="index"
        :image="item.image"
        :price="item.price"
        :name="item.name"
        :wear="item.wear"
      />
    </div>
  </div>
</template>

<script>
import Referal from "@/components/Referal.vue";
import Tier from "@/components/Tier.vue";
import Levels from "@/components/Levels/Levels.vue";
import ReferalPrize from "@/components/ReferalPrize.vue";
// import Spinner from '@/components/Spinner.vue'
// import Info from '@/components/JackpotInfo.vue'
// import JackpotBets from '@/components/JackpotBets.vue'

export default {
  name: "Referals",
  components: {
    Referal,
    Tier,
    Levels,
    ReferalPrize
  },
  data() {
    return {
      prizes: [
        {
          image:
            "https://files.opskins.media/file/vgo-img/item/skeleton-key-600.png",
          price: 250,
          name: "VGO KEY",
          wear: "FACTORY NEW"
        },
        {
          image:
            "https://files.opskins.media/file/vgo-img/item/skeleton-key-600.png",
          price: 250,
          name: "VGO KEY",
          wear: "FACTORY NEW"
        },
        {
          image:
            "https://files.opskins.media/file/vgo-img/item/skeleton-key-600.png",
          price: 250,
          name: "VGO KEY",
          wear: "FACTORY NEW"
        },
        {
          image:
            "https://files.opskins.media/file/vgo-img/item/skeleton-key-600.png",
          price: 250,
          name: "VGO KEY",
          wear: "FACTORY NEW"
        }
      ],
      stats: {
        totalValue: 25000,
        totalPoints: 15000,
        referredPlayers: 45,
        playerCut: 30,
        balance: 15600
      },
      levels: {
        tier: 1,
        current: 13,
        total: 25
      },
      tiers: [
        { tier: 1, xp: 250, points: 500, locked: false, disabled: true },
        { tier: 2, xp: 250, points: 500, locked: false, disabled: false },
        { tier: 3, xp: 250, points: 500, locked: true, disabled: false },
        { tier: 4, xp: 250, points: 500, locked: true, disabled: false },
        { tier: 5, xp: 250, points: 500, locked: true, disabled: false },
        { tier: 6, xp: 250, points: 500, locked: true, disabled: false },
        { tier: 7, xp: 250, points: 500, locked: true, disabled: false }
      ]
    };
  },
  mounted() {},
  beforeMount() {
    if (!this.authenticated) {
      this.$router.push("/");
    }
  },
  props: ["actions", "authenticated"]
};
</script>

<style scoped>
.referals {
  color: #ffffff;
  position: fixed;
  left: 362px;
  top: 122px;
  right: 0;
  bottom: 0;
  padding: 15px 35px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  align-content: flex-start;
}

.tiers {
  margin-top: 15px;
  width: 100%;
  padding-bottom: 15px;
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
}

.stats {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 15px 0;
}

.stat {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  border-radius: 5px;
  border: 2px solid #2b333c;
  padding: 0 30px;
  font-weight: bold;
  font-size: 0.8em;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  width: 33%;
  min-width: 370px;
}

.middle {
  /* margin: 0 30px; */
}

.orange {
  display: inline;
  color: #faa538;
}
</style>
