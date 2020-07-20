<template>
  <div id="app">
    <mdb-navbar color="cyan darken-1" dark>
    <mdb-navbar-brand href="https://mdbootstrap.com/">
    <router-link to="/">
      <img src="https://aalhibsy.com/bl.png" height="30" alt="">
       </router-link>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
      
     
      <mdb-nav-item v-if="isLoggedIn" router to="/dashboard">Dashboard</mdb-nav-item> 
      <mdb-nav-item v-if="isLoggedIn" router to="/atlet">Atlet</mdb-nav-item> 
      <mdb-nav-item v-if="isLoggedIn" router to="/pelatih">Pelatih</mdb-nav-item> 
      <mdb-nav-item v-if="isLoggedIn" router to="/ukm">UKM</mdb-nav-item> 
      <mdb-nav-item v-if="isLoggedIn" router to="/ukm_atlet">UKM Atlet</mdb-nav-item> 
      <mdb-nav-item v-if="isLoggedIn" router to="/presensi_atlet">Presensi Atlet</mdb-nav-item> 
      <mdb-nav-item v-if="isLoggedIn" router to="/presensi_pelatih">Presensi Pelatih</mdb-nav-item> 
      <mdb-nav-item v-if="isLoggedIn" router to="/report">Report</mdb-nav-item> 
      
   </mdb-navbar-nav>
      <router-link v-if="isLoggedIn === 'true'" to="/logout">
        <mdb-btn color="warning"  rounded>Logout</mdb-btn>
      </router-link>
      <router-link v-else to="/login">
        <mdb-btn color="success"  rounded>Login</mdb-btn>
      </router-link>
   </mdb-navbar-toggler>
   </mdb-navbar>
   <br />
   <br />
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "Menu",
  components: {
     
    },
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
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

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
  };
  // background-image: linear-gradient(45deg,#00349b,rgba(0,92,255,.9219),#13abe5);
  // margin-bottom: 50px;
}
</style>