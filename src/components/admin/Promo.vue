<template>
  <div class="tab-container">
    <table cellspacing="0" cellpadding="0">
      <tr>
        <th>Codes</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr class="user" v-for="(code, index) in codes" :key="index">
        <td>
          <div class="content">
            <div class="username">{{code.code}}</div>
          </div>
        </td>
        <td><div class="content">${{code.value}}</div></td>
        <td><div class="content">used {{code.timesUsed}} times</div></td>
        <td><div class="content">
          <div class="button">DELETE</div>
          <div class="button warning">Change</div>
        </div></td>
      </tr>
    </table>
    <table cellspacing="0" cellpadding="0">
      <tr>
        <th>Rank</th>
        <th></th>
        <th></th>
      </tr>
      <tr class="user" v-for="(user, index) in ranks" :key="index">
        <td>
          <div class="content">
            <div class="username">{{user.username}}</div>
          </div>
        </td>
        <td><div class="content">{{user.rank}}</div></td>
        <td><div class="content">
          <div class="button">DELETE</div>
        </div></td>
      </tr>
    </table>
    <div class="add"><input type="text"><div class="button green">Add</div></div>
  </div>
</template>

<script>
export default {
  name: 'promo',
  props: [],
  data () {
    return {
      ranks: [
        {
          username: 'Admin man!',
          rank: 'Partner'
        }
      ],
      codes: [
        {
          code: 'Moro',
          value: 0.5,
          timesUsed: 123,
        },
        {
          code: 'Moro',
          value: 0.5,
          timesUsed: 123,
        },
        {
          code: 'Moro',
          value: 0.5,
          timesUsed: 123,
        },
        {
          code: 'Moro',
          value: 0.5,
          timesUsed: 123,
        }
      ]
    }
  }

}
</script>

<style scoped>

  .tab-container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  }

  table {
    width: 500px;
    margin-right: 25px;
  }

  .user {
    height: 65px;
  }

  th {
    text-align: left;
    white-space: nowrap;
  }

  .user td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    border-bottom:1pt solid #40464c;
  }

  .content {
    height: 65px;
    display: flex;
    align-items: center;
    color: #616b76;
  }

  .button {
    font-weight: bold;
    margin: 7.5px;
    color: #e1355a;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
  }

  .button:hover {
    color: white;
  }

  .button:active {
    color: #929ea9;
  }

  .warning {
    color: #f9a538;
  }

  .add {
    position: absolute;
    bottom: 50px;
    right: 20px;
    display: flex;
  }

  .add input {
    width: 270px;
    height: 40px;
    background: #22272b;
    outline: none;
    border: none;
    color: white;
    padding: 0 25px;
    margin-right: 25px;
  }

  .add input::placeholder {
    color: #929ea9;
  }

  .green {
    color: #3fffb0;
  }

</style>
