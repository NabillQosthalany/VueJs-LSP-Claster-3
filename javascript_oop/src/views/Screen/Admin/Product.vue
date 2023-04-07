<template>
  <v-app>
    <SideBar/>
    <v-data-table
        :headers="headers"
        :items="dataProduct"
        sort-by="calories"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>Tas Nike</v-toolbar-title>
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
                          v-model="price"
                          label="Price"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="stock"
                          label="Stock"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="date"
                          label="Date"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="amoutSold"
                          label="Amout Sold"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="category_id"
                          label="Category Id"
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
                          v-model="edited.price"
                          label="Price"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="edited.stock"
                          label="Stock"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="edited.amoutSold"
                          label="Amout Sold"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="edited.date"
                          label="Date"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="edited.category_id"
                          label="Category Id"
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
    dataProduct: [],
    price:0,
    stock:0,
    date:'',
    amoutSold:0,
    category_id:0,
    deleteProductId:0,
    edited:{
      date:'',
      amoutSold:0,
      price:0,
      stock:0,
      category_id:0,
      editProductId:0
    },
    headers: [
      {text: 'Price', value: 'price'},
      {text: 'Stock', value: 'stock'},
      {text: 'Amount Sold', value: 'amount_sold'},
      {text: 'Date', value: 'tgl_input'},
      {text: 'Category Id', value: 'category_id'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
  }),
  created() {
    this.getProduct()
  },

  methods: {
    getProduct() {
      axios.get('http://localhost:8080/product')
          .then(res => {
            this.dataProduct = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    createProduct() {
      axios.post('http://localhost:8080/product', {
        "stock": this.stock,
        "price": this.price,
        "amount_sold":this.amout_so,
        "tgl_input":this.date,
        "category_id": this.category_id
      }).then(res => {
        this.getProduct()
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
    getEdit(dataProduct) {
      this.dialogEdit = true
      this.edited.editProductId = dataProduct.id
      this.edited.price = dataProduct.price
      this.edited.date = dataProduct.tgl_input
      this.edited.stock = dataProduct.stock
      this.edited.amoutSold = dataProduct.amount_sold
      this.edited.category_id = dataProduct.category_id


    },
    updateProduct() {
      const id = this.edited.editProductId
      axios.put(`http://localhost:8080/product/${id}`, {
        data: {
          id: this.edited.editProductId
        },
        "stock": this.edited.stock,
        "price": this.edited.price,
        "amount_sold":this.edited.amoutSold,
        "tgl_input":this.edited.date,
        "category_id": this.edited.category_id
      })
          .then(res => {
            this.getProduct();
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
      this.deleteProductId = dataProduct.id
    },
    deletePelatih() {
      const id = this.deleteProductId;
      axios.delete(`http://localhost:8080/product/${id}`, {
        data: {
          id: this.deleteProductId
        }
      })
          .then(res => {
            this.getProduct();
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
