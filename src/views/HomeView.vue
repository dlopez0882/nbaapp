<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Intro msg="NBA Info App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Intro from "@/components/Intro.vue";

export default {
  name: "HomeView",
  components: {
    Intro,
  },
};
</script>
