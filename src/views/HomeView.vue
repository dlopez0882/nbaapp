<template>
  <div class="home">
    <LogoComponent></LogoComponent>
    <Intro msg="NBA Info App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Intro from "@/components/Intro.vue";
import LogoComponent from "@/components/LogoComponent.vue";

export default {
  name: "HomeView",
  components: {
    Intro,
    LogoComponent
},
};
</script>
