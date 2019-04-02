<template>
  <div class="container">
    <div class="row">
      <div class="title">Set your Trade URL</div>
       <!-- <div class="help"><i class="material-icons">help</i></div> -->
    </div>
    <div class="row">
      <input type="text" v-model="url" placeholder="URL..."/>
      <div class="button" @click="setURL()">Save</div>
    </div>
    <div class="row footer">
        <!-- <div class="ref">Jackpot.gg/joinid=moro96</div> -->
        <!-- <i class="material-icons copy">file_copy</i> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'tradeURL',
  props: ['actions'],
  data () {
    return {
      url: ''
    }
  },
  methods: {
    setURL() {
      this.actions.setMyExpressTradeUrl({expresstradeurl: this.url}).then(res => {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'Success',
          text: 'Your Trade URL has been set.',
        })
      }).catch(err => {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: err,
        })
      })
    }
  }
}
</script>

<style scoped>

  .container {
    background-color: #2b333c;
    border-radius: 5px;
    height: 255px;
    flex-grow: 1;
    box-shadow: 3px 3px 15px 0px rgba(0, 0, 0, 0.25);
    margin: 15px 0;
    margin-right: 10px;
    overflow: hidden;
  }

  .row {
    height: 85px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }

  .title {
    width: 50%;
    padding-left: 30px;
  }

  .help {
    width: 50%;
    text-align: right;
    padding-right: 30px;
  }

  input {
    margin: 0 30px;
    height: 55px;
    width: 195px;
    background: none;
    border: 1px solid;
    border-color: #4e555d;
    border-radius: 3px;
    outline: none;
    font-size: 1em;
    box-shadow: none;
    padding: 0 40px 0 20px;
    color: #8f97a1;
  }

  input::placeholder {
    color: #666b70;
  }

  .button {
    height: 35px;
    width: 95px;
    background: #faa538;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;

  }

  .footer {
    background: #222830;
    padding: 8px;
  }

  .ref {
    background: #252c34;
    height: 100%;
    flex-grow: 1;
    border-radius: 5px;
    padding-left: 30px;
    color: #9ba2ab;
    display: flex;
    align-items: center;
  }

  .copy {
    margin: 0 20px;
  }

  @media screen and (max-width: 1070px) {
    .container {
      margin: 15px 0;
      width: 100%;
    }
  }

</style>
