<template>
<b-container fluid="lg">
    <!-- User Interface controls -->
    <b-row>
         <b-col lg="6" class="my-1">
         <h4>Presensi Atlet</h4>
     </b-col>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    
    </b-row>

    <!-- Main table element -->
    <b-table
      striped
      responsive
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :filter="filter"
      :filterIncludedFields="filterOn"
      @filtered="onFiltered"
    >
      <template v-slot:cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template v-slot:cell(actions)="row">
        <b-button variant="success" size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Data JSON
        </b-button>
        <b-button variant="primary" size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
        <b-button variant="danger" size="sm" @click="onDelete(row.item.id)">
          Hapus 
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul class="text-justify">
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>


<script>
import axios from "axios";

export default {
    name: "Dashboard",
    data() {
        return {
            items: [],
            fields: [
                 {
                    key: 'tanggal',
                    sortable: true
                },
                {
                    key: 'ukm',
                    sortable: true
                },
                {
                    key: 'nama',
                    sortable: true
                },
                 {
                    key: 'materi',
                    sortable: true
                },
                { key: 'actions', label: 'Aksi' }
               
            ],
            pageOptions: [5, 10, 15],
            filter: null,
            filterOn: [],
            infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
            }
        }
    },
    created() {
        let token = localStorage.getItem("token");
        let auth = { 
            Authorization: 'Bearer ' + token
        }
        axios.get(`${process.env.VUE_APP_ROOT_API}/admin/presensi/atlet`, {
            headers: auth
        })
        .then(res => {
            this.items = res.data
        })
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Data JSON`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
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
                    url: `${process.env.VUE_APP_ROOT_API}/admin/presensi_atlet/`+id,
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
    }
}
</script>