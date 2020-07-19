<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/atlet">Atlet</router-link> |
      <router-link to="/pelatih">Pelatih</router-link> |
      <router-link to="/ukm">UKM</router-link> |
      <router-link to="/ukm_atlet">UKM Atlet</router-link> |
      <router-link to="/presensi_atlet">Presensi Atlet</router-link> |
      <router-link to="/presensi_pelatih">Presensi Pelatih</router-link> |
      <router-link to="/report">Report</router-link> |
      
      <span v-if="isLoggedIn === 'true'"> <router-link to="/logout">Logout</router-link> </span>
      <span v-else> <router-link to="/login">Login</router-link> </span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Menu",
    data() {
        return {
          isLoggedIn : localStorage.getItem("LoggedUser")
        }
  },
  methods: {
      cekUser(){
        if(localStorage.getItem('LoggedUser') == "true")
          return isAuthenticated = true;
        else
          return isAuthenticated= false;
      },
      logout(){
        localStorage.clear();
        this.$router.push({ name: 'dashboard' })
        window.location.reload();
      }
  
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
