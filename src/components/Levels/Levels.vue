<template>
  <div class="container">
    <div class="title">Tier {{tier}}</div>
    <div class="bar">
      <div class="progress-bar"></div>
    </div>
    <div class="next">
      <div class="next-tier">
        <div class="sub-title">Next Tier</div>
        <div class="description">{{current}}/{{total}} referals</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Levels",
  props: ["tier", "current", "total"]
};
</script>

<style scoped>
.container {
  background-color: #2b333c;
  border-radius: 5px;
  height: 255px;
  flex-grow: 1;
  box-shadow: 3px 3px 15px 0px rgba(0, 0, 0, 0.25);
  margin: 15px 0;
  display: flex;
  flex-wrap: wrap;
}

.title {
  font-size: 1.2em;
  font-weight: bold;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  background: #faa538;
  border-radius: 5px;
  height: 10px;
  width: 90%;
}

.next {
  height: 105px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.next-tier {
  width: 150px;
  height: 50px;
  border-radius: 5px;
  background: #1f252c;
  padding-top: 10px;
}

.sub-title {
  font-size: 0.8em;
  width: 100%;
  text-align: center;
}

.description {
  width: 100%;
  text-align: center;
  color: #6d7a89;
  font-size: 0.6em;
}

@media screen and (max-width: 1070px) {
  .container {
    margin: 15px 0;
    width: 100%;
  }
}
</style>
