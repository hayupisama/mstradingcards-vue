<template>
   <nav>
          <router-link to="/mydashboard">Dashboard</router-link>
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
          <!-- Add more links as needed -->
        </nav>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>
nav {
    background-color: #333;
    color: #fff;
    padding: 10px;
}

a{
    margin-right: 10px;
    color: #fff;
    text-decoration: none;
}
</style>
