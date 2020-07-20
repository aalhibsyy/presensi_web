<template>
    <mdb-container>
    <img alt="Vue logo" width="10%" height="10%" src="../assets/logopresensi.png">
    <br />
    <br />
    <h1>Website</h1>
    <h1>Presensi Training From Home</h1>
    <h1>Universitas Budi Luhur</h1>
   
   </mdb-container>
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
