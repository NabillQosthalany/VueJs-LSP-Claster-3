<template>
  <v-app>
    <SideBar/>
    <v-data-table
        :headers="headers"
        :items="dataItem"
        sort-by="calories"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>User</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <button class="btnExcel" @click="exportToExcel">Export to Excel</button>
      </template>
    </v-data-table>
  </v-app>

</template>

<script>
import SideBar from '../../../components/SideBarUser'
import XLSX from 'xlsx';
import axios from "axios";

export default {
  components: {
    SideBar
  },
  data: () => ({
    dialog: false,
    dialogCreate: false,
    dialogDelete: false,
    dialogEdit: false,
    dataItem: [],
    headers: [
      {
        text: 'Name Category',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Price', value: 'price'},
      {text: 'Stock', value: 'stock'},
      {text: 'Name Category', value: 'name_category'},
      {text: 'Description', value: 'description'},
    ],
  }),
  created() {
    this.getData()
  },

  methods: {
    getData() {
      axios.get('http://localhost:8080/with-category')
          .then(res => {
            this.dataItem = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    exportToExcel() {
      axios.get('http://localhost:8080/products/export/excel', { responseType: 'blob' })
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'products.xlsx');
            document.body.appendChild(link);
            link.click();
          })
          .catch(error => {
            console.error(error);
          });
    },
  }
}
</script>
<style scoped>
.btnExcel{
  background-color:transparent  !important;
  margin-left: 20px;
  border-radius: 20px;
}
</style>
