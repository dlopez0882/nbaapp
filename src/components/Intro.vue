<template>
  <div class="intro">
    <h1>{{ msg }}</h1>
    <p>An app displaying information about NBA players ands games.</p>
    <p>Data provided by <a href="https://www.balldontlie.io/" target="_blank">balldontlie API</a>.</p>
    <p>Made using <a href="https://cli.vuejs.org" target="_blank">vue-cli</a></p>
  </div>
</template>

<script>
export default {
  name: "Intro",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
