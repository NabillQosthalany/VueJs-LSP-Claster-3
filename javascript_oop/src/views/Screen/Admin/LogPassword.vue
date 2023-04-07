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
      </template>
    </v-data-table>
  </v-app>

</template>

<script>
import SideBar from '../../../components/Sidebar'
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
        text: 'Stock Before',
        align: 'start',
        sortable: false,
        value: 'stock_before',
      },
      {text: 'Stock After', value: 'stock_after'},
      {text: 'Created At', value: 'created_at'},
    ],
  }),
  created() {
    this.getData()
  },

  methods: {
    getData() {
      axios.get('http://localhost:8080/penjualan')
          .then(res => {
            this.dataItem = res.data
          })
          .catch(err => {
            console.log(err)
          })
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
