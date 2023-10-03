<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required><br>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required><br>
        <button type="submit">Login</button>
      </form>
      <div v-if="getResponseMsg" class="response-message">
      {{ getResponseMsg }}
    </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
    ...mapGetters(['getResponseMsg'])
  },
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        this.$store.dispatch('login', { username: this.username, password: this.password });
      }
    }
  }
  </script>
  