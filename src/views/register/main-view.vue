<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required><br>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required><br>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" required><br>
        <label for="firstName">First Name:</label>
        <input type="text" v-model="firstName" required><br>
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="lastName" required><br>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required><br>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: ''
      };
    },
    methods: {
      register() {
        this.$store.dispatch('register', {
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email
        });
      }
    }
  }
  </script>
  