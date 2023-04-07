<template>
  <v-app>
    <SideBar/>
    <v-data-table
        :headers="headers"
        :items="dataCategory"
        sort-by="calories"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>Data Category</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>

          <!--         dialogCreate-->
          <v-dialog v-model="dialogCreate" persistant max-width="500px">
            <template v-slot:activator="{on,attrs}">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Add Data
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
            <span class="headline">
              Add Data
            </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="name"
                          label="Name Category"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="desc"
                          label="Description"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue-draken-1" text @click="dialogCreate = false">Batal</v-btn>
                <v-btn color="blue-draken-1" text @click="createProduct">Tambah</v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>

          <!--          dialog Update-->
          <v-dialog v-model="dialogEdit" persistant max-width="500px">
            <v-card>
              <v-card-title>
            <span class="headline">
              Add Data
            </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="edited.name"
                          label="Name Category"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="edited.desc"
                          label="Description"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue-draken-1" text @click="dialogEdit = false">Batal</v-btn>
                <v-btn color="blue-draken-1" text @click="updateProduct">Tambah</v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>


          <!--          dialogDelete-->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deletePelatih">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="getEdit(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="getDelete(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-app>

</template>

<script>
import SideBar from '../../../components/Sidebar'
import Swal from 'sweetalert2'
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
    dataCategory: [],
    name:'',
    desc:'',
    deleteCategoryId:0,
    edited:{
      name:'',
      desc:'',
      editCategoryId:0
    },
    headers: [
      {
        text: 'Name Category',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Description', value: 'desc'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
  }),
  created() {
    this.getCategory()
  },

  methods: {
    getCategory() {
      axios.get('http://localhost:8080/category')
          .then(res => {
            this.dataCategory = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    createProduct() {
      axios.post('http://localhost:8080/category', {
        "name": this.name,
        "desc": this.desc
      }).then(res => {
        this.getCategory()
        this.dialogCreate = false,
            Swal.fire({
              icon: 'success',
              title: 'Berhasil Tambah Data Product',
              showConfirmButton: false,
              timer: 2000
            })
      })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'The entered username is not available!',
            })
          })
    },
    getEdit(dataCategory) {
      this.dialogEdit = true
      this.edited.editCategoryId = dataCategory.id
      this.edited.name = dataCategory.name
      this.edited.desc = dataCategory.desc


    },
    updateProduct() {
      const id = this.edited.editCategoryId
      axios.put(`http://localhost:8080/category/${id}`, {
        data: {
          id: this.edited.editCategoryId
        },
        "id":this.edited.editCategoryId,
        "name": this.edited.name,
        "desc": this.edited.desc,
      })
          .then(res => {
            this.getCategory();
            this.dialogEdit = false
            Swal.fire({
              icon: 'success',
              title: 'Data Pelatih Berhasil Di Update',
              showConfirmButton: false,
              timer: 2000
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'The entered username is not available!',
            })
          })
    },
    getDelete(dataProduct) {
      this.dialogDelete = true
      this.deleteCategoryId = dataProduct.id
    },
    deletePelatih() {
      const id = this.deleteCategoryId;
      axios.delete(`http://localhost:8080/category/${id}`, {
        data: {
          id: this.deleteProductId
        }
      })
          .then(res => {
            this.getCategory();
            this.dialogDelete = false
            Swal.fire({
              icon: 'success',
              title: 'Data Pelatih Berhasil Di Hapus',
              showConfirmButton: false,
              timer: 2000
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Gagal Hapus Data',
            })
          })
    },

  }
}
</script>
