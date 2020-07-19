<template>

<b-container class="bv-example-row">
  <h1>Download Laporan</h1>
  <br />
  <b-row class="text-center">

    <b-col> <b-button variant="warning" @click="reportAtlet()">Data Atlet</b-button> </b-col>
    <b-col> <b-button variant="danger" @click="reportPelatih()">Data Pelatih</b-button> </b-col>
    <b-col> <b-button variant="success" @click="reportPresensiAtlet()">Data Presensi Atlet</b-button> </b-col>
    <b-col> <b-button variant="primary" @click="reportPresensiPelatih()">Data Presensi Pelatih</b-button> </b-col>
  </b-row>
<pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>

  
</b-container>
  
  
</template>

<script>
import axios from "axios";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


export default {
    name: "Report",
   data () {
    return {
      loading: false,
      color: '#cc181e',
      color1: '#5bc0de',
      size: '45px',
      margin: '2px',
      radius: '2px'
    }
  },
  components: {
    PulseLoader
  },
    methods: {
      reportAtlet(){
        this.loading = true;
        let token = localStorage.getItem("token");
        let auth = { 
            Authorization: 'Bearer ' + token
        }
        axios({
            method: 'get',
            url: `${process.env.VUE_APP_ROOT_API}/admin/report/atlet`,
            responseType: 'arraybuffer',
            headers: auth
          }).then(function(response) {
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'Report_Atlet.pdf'
            link.click()
            window.location.reload();
        })
            // this.loading = false;
      },
      reportPelatih(){
        this.loading = true;
        let token = localStorage.getItem("token");
        let auth = { 
            Authorization: 'Bearer ' + token
        }
        axios({
            method: 'get',
            url: `${process.env.VUE_APP_ROOT_API}/admin/report/pelatih`,
            responseType: 'arraybuffer',
            headers: auth
          }).then(function(response) {
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'Report_Pelatih.pdf'
            link.click()
             window.location.reload();
        })
      },
      reportPresensiAtlet(){
        this.loading = true;
        let token = localStorage.getItem("token");
        let auth = { 
            Authorization: 'Bearer ' + token
        }
        axios({
            method: 'get',
            url: `${process.env.VUE_APP_ROOT_API}/admin/report/presensi_atlet`,
            responseType: 'arraybuffer',
            headers: auth
          }).then(function(response) {
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'Report_Presensi_Atlet.pdf'
            link.click()
             window.location.reload();
        })
      },
      reportPresensiPelatih(){
        this.loading = true;
        let token = localStorage.getItem("token");
        let auth = { 
            Authorization: 'Bearer ' + token
        }
        axios({
            method: 'get',
            url: `${process.env.VUE_APP_ROOT_API}/admin/report/presensi_pelatih`,
            responseType: 'arraybuffer',
            headers: auth
          }).then(function(response) {
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'Report_Presensi_Pelatih.pdf'
            link.click()
             window.location.reload();
        })
      },
    }
}
</script>