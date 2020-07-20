<template>
<b-container fluid="lg">
    <b-row>
        <b-col lg="3" class="my-1">
            <b-button variant="success" v-b-modal.modalData @click="enable=false">Tambah</b-button>
        </b-col>
        <b-col lg="3" class="my-1">
            <h4>Data Pelatih</h4>
        </b-col>
        
        
        
        <b-col lg="6" class="my-1">
            <b-form-group
                label="Filter"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0">
                <b-input-group size="sm">
                <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                    <b-button variant="warning" :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-col>
    
    </b-row>

    <b-table striped
    responsive
    hover
    bordered
    :filter="filter"
    :filterIncludedFields="filterOn"
    :items="items" 
    :fields="fields">


     <template v-slot:cell(actions)="row">
         <b-button variant="primary" size="sm" v-b-modal.modalData @click="editData(row.item, row.index)" class="mr-1">
          Edit
        </b-button>
     
        <b-button variant="danger" size="sm" @click="onDelete(row.item.id)">
          Hapus 
        </b-button>
      </template>
    
                                    
    </b-table>

    <!-- Data Modal -->
    <b-modal id="modalData" v-model="show" hide-footer>
        <h4 v-if="enable" class="modal-title text-center">Ubah</h4>
        <h4 v-else class="modal-title text-center">Tambah</h4>
         <form v-on:submit.prevent="enable ? onUpdate() : onSubmit()">
          <div class="form-group">
            <label>UKM</label>
            <b-form-select v-model="dataField.ukm_id" :options="ukm" value-field="id" text-field="nama" class="form-control"></b-form-select>
          </div>
          <div class="form-group">
            <label>Nama</label>
            <input v-model="dataField.nama" type="text" class="form-control"  required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="dataField.email" type="email" class="form-control"  required>
          </div>
          <div class="form-group">
            <label>Telepon</label>
            <input v-model="dataField.telepon" type="text" class="form-control"  required>
          </div>
           <div class="form-group">
            <label>Password</label>
            <input v-model="dataField.password" type="password" min="8" class="form-control">
          </div>
           <div class="form-group">
            <label>Konfirmasi Password</label>
            <input v-model="dataField.password_confirmation" type="password" min="8" class="form-control">
          </div>

          <div class="ml-auto text-right">
            <input type="hidden" v-model="dataField.id">
            <button v-if="enable" @click="show=false" type="submit" class="btn btn-primary my-2">Update</button>
            <button v-else type="submit" @click="show=false" class="btn btn-primary my-2">Add</button>
          </div>
        
      </form>
    </b-modal>

    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->
</b-container>
</template>

<script>
import axios from "axios";

export default {
    name: "Dashboard",
    data() {
        return {
            show: false,
            enable: false,
            dataField: {
                'id' : '',
                'nama': '',
                'email': '',
                'telepon': '',
                'ukm_id': '',
                'ukm_nama': '',
                'password': '',
                'password_confirmation': ''
            },
            items: [],
            ukm: [],
            fields: [
                {key: 'id', thClass: 'd-none', tdClass: 'd-none' },
                {key: 'ukm_id', thClass: 'd-none', tdClass: 'd-none' },
                 {
                    key: 'ukm_nama',
                    sortable: true
                },
                {
                    key: 'nama',
                    sortable: true
                },
                {
                    key: 'email',
                    sortable: true
                },
                {
                    key: 'telepon',
                    sortable: true
                },
                { key: 'actions', label: 'Aksi' }
            ],
            pageOptions: [5, 10, 15],
            filter: null,
            filterOn: [],
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            let token = localStorage.getItem("token");
            let auth = { 
                Authorization: 'Bearer ' + token
            }
            //Get Data Pelatih
            axios.get(`${process.env.VUE_APP_ROOT_API}/admin/pelatih_list`, {
                headers: auth
            })
            .then(res => {
                this.items = res.data
            })
            // Get Data UKM
            axios.get(`${process.env.VUE_APP_ROOT_API}/admin/ukm`, {
                headers: auth
            })
            .then(res => {
                this.ukm = res.data
            })
        },
        onSubmit() {
            let token = localStorage.getItem("token");
            let data = {
                ukm_id: this.dataField.ukm_id,
                nama: this.dataField.nama,
                email: this.dataField.email,
                telepon: this.dataField.telepon,
                password: this.dataField.password,
                password_confirmation: this.dataField.password_confirmation,
            }
            let auth = { 
                Authorization: 'Bearer ' + token
            }
            axios({
                method: "POST",
                url: `${process.env.VUE_APP_ROOT_API}/admin/pelatih_add`,
                headers: auth,
                data: data
            })
            .then(res => {
                if(res.data.status == 201) {
                      this.$swal('Berhasi!',
                    'Data Berhasil Ditambah!',
                        'success');
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err.res)
                this.$swal('Gagal!',
                    'Data Gagal Ditambah!',
                        'error');
            })
        },
        onDelete(id){
           console.log('data' + id)
            var result = confirm('Anda ingin menghapus data?');
            if (result) {
                let token = localStorage.getItem("token");
                let auth = { 
                    Authorization: 'Bearer ' + token
                }
                axios({
                    method: "DELETE",
                    url: `${process.env.VUE_APP_ROOT_API}/admin/pelatih_delete/`+id,
                    headers: auth,
                    // data: data
                })
                .then(res => {
                    if(res.data.status == 200) {
                       this.$swal('Berhasi!',
                    'Data Berhasil Dihapus!',
                        'success');
                    window.location.reload();
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$swal('Gagal!',
                    'Data Gagal Dihapus!',
                        'error');
                })
                
            }
        },
        editData(item, index,) {
            this.enable = true;
            this.dataField.id = item.id;
            this.dataField.ukm_id = item.ukm_id;
            this.dataField.ukm_nama = item.ukm_nama;
            this.dataField.nama = item.nama;
            this.dataField.email = item.email;
            this.dataField.telepon = item.telepon;
         
        },
        onUpdate() {
            let token = localStorage.getItem("token");
            let id = this.dataField.id;
            let data = {
                ukm_id: this.dataField.ukm_id,
                ukm_nama: this.dataField.ukm_nama,
                nama: this.dataField.nama,
                email: this.dataField.email,
                telepon: this.dataField.telepon,
                password: this.dataField.password,
                password_confirmation: this.dataField.password_confirmation,
            }
            let auth = { 
                Authorization: 'Bearer ' + token
            }

            axios({
                method: "PUT",
                url: `${process.env.VUE_APP_ROOT_API}/admin/pelatih_update/`+id,
                headers: auth,
                data: data
            })
            .then(res => {
                if(res.data.status == 200) {
                    this.$swal('Berhasi!',
                    'Data Berhasil Diubah!',
                        'success');
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err)
                this.$swal('Gagal!',
                    'Data Gagal Diubah!',
                        'error');
            })
        },
    }
}
</script>