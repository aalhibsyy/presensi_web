<template>
  <div>
      <h1>Dashboard</h1>
      <h2>Selamat Datang {{ datas.nama }}</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Dashboard",
    data() {
        return {
            datas: []
        }
    },
    created() {
        let token = localStorage.getItem("token");
        let nama = localStorage.getItem("nama");
        
        let auth = { 
            Authorization: 'Bearer ' + token
        }
        axios.get(`${process.env.VUE_APP_ROOT_API}/admin/profile`, {
            headers: auth
        })
        .then(res => {
            this.datas = res.data
        })
    }
}
</script>