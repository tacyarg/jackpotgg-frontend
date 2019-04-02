<template>
  <div class="tab-container">
    <div class="controls">
      <input class="search" type="text" placeholder="Search Player...">
      <div class="filter">Filter (Newest) <i class="material-icons">arrow_drop_down</i></div>
    </div>
    <table cellspacing="0" cellpadding="0">
      <tr>
        <th>Username</th>
        <th>Level</th>
        <th>Registered on</th>
        <th>Last online</th>
        <th>Wagered</th>
        <th>Won</th>
        <th>Our Profit</th>
        <th>IP-Address (Location)</th>
        <th></th>
      </tr>
      <tr class="user" v-for="(user, index) in users" :key="index">
        <td>
          <div class="content">
            <img class="avatar" :src="user.avatar">
            <div class="username">{{user.username}}</div>
          </div>
        </td>
        <td><div class="content">Level {{user.level}}</div></td>
        <td><div class="content">{{user.created}}</div></td>
        <td><div class="content">{{user.lastOnline}}</div></td>
        <td><div class="content">${{user.wagered.toFixed(2)}}</div></td>
        <td><div class="content">${{user.won.toFixed(2)}}</div></td>
        <td><div class="content">${{(user.wagered - user.won).toFixed(2)}}</div></td>
        <td><div class="content">{{user.ip}} ({{user.location}})</div></td>
        <td><div class="content">
          <div class="button">DELETE</div>
          <div class="button">BAN</div>
          <div class="button mute">MUTE</div>
        </div></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'users',
  props: [],
  data () {
    return {
      users: [
        {
          username: 'Moro',
          avatar: require('@/assets/avatar.png'),
          level: '54',
          created: '21-09-2018',
          lastOnline: '5 minutes ago',
          wagered: 1.25,
          won: 15.55,
          ip: '192.168.0.1',
          location: 'Canada'
        },
        {
          username: 'Daywiss',
          avatar: require('@/assets/avatar.png'),
          level: '666',
          created: '21-09-2018',
          lastOnline: '24 minutes ago',
          wagered: 5000,
          won: 3500,
          ip: '192.168.0.1',
          location: 'USA'
        },
        {
          username: 'Tacyarg',
          avatar: require('@/assets/avatar.png'),
          level: '22',
          created: '21-09-2018',
          lastOnline: '2 minutes ago',
          wagered: 1000,
          won: 25.25,
          ip: '192.168.0.1',
          location: 'USA'
        }
      ]
    }
  }

}
</script>

<style scoped>

  .tab-container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
  }

  .controls {
    margin-bottom: 35px;
    display: flex;
    align-items: center;
  }

  .search {
    width: 270px;
    height: 65px;
    background: #22272b;
    outline: none;
    border: none;
    color: white;
    padding: 0 25px;
    margin-right: 25px;
  }

  .filter {
    color: #727c85;
    cursor: pointer;
  }

  .search::placeholder {
    color: #929ea9;
  }

  .button:hover {
    color: white;
  }

  .button:active {
    color: #929ea9;
  }

  table {
    width: 100%;
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
    border-bottom:1pt solid #40464c;
  }

  .username {
    color: white !important;
    font-weight: bold;
  }

  .content {
    height: 65px;
    display: flex;
    align-items: center;
    color: #616b76;
  }

  .avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 25px;
  }

  .button {
    font-weight: bold;
    margin: 7.5px;
    color: #e1355a;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
  }

  .mute {
    color: #f9a538;
  }

</style>
