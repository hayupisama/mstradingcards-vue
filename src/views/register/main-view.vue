<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Register</h2>
      <div v-if="getRegistrationStatus" class="error-message">
        {{ getRegistrationStatus }}
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <input type="text" v-model="username" placeholder="Username" required />
          <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" required />
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>
        <div class="input-group">
          <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
          <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
        </div>
        <div class="input-group">
          <input type="text" v-model="firstName" placeholder="First Name" required />
          <div v-if="errors.firstName" class="error-message">{{ errors.firstName }}</div>
        </div>
        <div class="input-group">
          <input type="text" v-model="lastName" placeholder="Last Name" required />
          <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>
        </div>
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required />
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>
        <div class="button-group">
          <button type="submit" class="btn-register" @click="register()">Register</button>
          <button type="button" class="btn-cancel" @click="handleCancel()">Cancel</button>
        </div>
      </form>
      <div class="links">
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

  
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      email: '',
      errors: {},
    };
  },
  computed: {
    ...mapGetters('register', [
      'getRegistrationStatus'
    ])
  },
  methods: {
    register() {
      this.errors = {}; // Reset errors
      if (this.validateForm()) {
        this.$store.dispatch('register/createUser', {
          username: this.username,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          role: "GUEST"
        });
      }

    },
    validateForm() {
      let isValid = true;

      if (!this.username) {
        this.errors.username = 'Username is required';
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = 'Password is required';
        isValid = false;
      }

      if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }

      if (!this.firstName) {
        this.errors.firstName = 'First Name is required';
        isValid = false;
      }

      if (!this.lastName) {
        this.errors.lastName = 'Last Name is required';
        isValid = false;
      }

      if (!this.email) {
        this.errors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = 'Invalid email address';
        isValid = false;
      }

      return isValid;
    },
    handleCancel() {
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.errors = {};
    }
  },

}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-box {
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

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn-register,
.btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-register {
  background-color: #007bff;
  color: #fff;
}

.btn-cancel {
  background-color: #dc3545;
  color: #fff;
}

.btn-register:hover,
.btn-cancel:hover {
  filter: brightness(90%);
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
  