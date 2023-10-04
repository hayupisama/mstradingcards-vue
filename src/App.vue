<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { setJwtToken } from "@/api/index.js"
export default {
  name: 'App',
  data() {
    return {
      jwt: localStorage.getItem("jwt")
    }
  },
  components: {
  },
  created() {
    if (!this.jwt)
      this.$router.push('/login');
    else {
      setJwtToken(this.jwt);
      this.$router.push("/mydashboard");
    }
  }
}
</script>
<style></style>
