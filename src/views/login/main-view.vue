<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <div v-if="getResponseMsg" class="error-message">
        {{ getResponseMsg }}
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <input type="text" v-model="username" placeholder="Username" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" required autocomplete />
        </div>
        <button type="submit" @click="login()" class="btn-login">Login</button>
      </form>
      <div class="links">
        <a href="#">Forgot Password?</a>
        <router-link to="/register">Register</router-link>
      </div>
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
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-login {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #0056b3;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.links a {
  text-decoration: none;
  color: #007bff;
}

.links a:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}
</style>
  