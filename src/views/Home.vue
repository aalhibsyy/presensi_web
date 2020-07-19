<template>
  <div class="home">
    <img alt="Vue logo" width="10%" height="10%" src="../assets/logopresensi.png">
    <h1>Presensi Training From Home</h1>
   
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  created() {
        // window.location.reload();
    },
}
</script>
