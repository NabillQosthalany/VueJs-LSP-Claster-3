<template>
  <v-app>
    <SideBar/>
    <v-data-table
        :headers="headers"
        :items="dataUser"
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
                          v-model="username"
                          label="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="role"
                          label="Role"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="password"
                          label="Password"
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    SideBar
  },
  data: () => ({
    dialog: false,
    dialogCreate: false,
    dialogDelete: false,
    dialogEdit: false,
    username:'',
    role:'',
    password:'',
    idUsername:0,
    dataUser: [],
    headers: [
      {
        text: 'Username',
        align: 'start',
        sortable: false,
        value: 'username',
      },
      {text: 'Role', value: 'role'},
      {text: 'Password', value: 'password'},
      {text: 'Actions', value: 'actions', sortable: false},

    ],
  }),
  created() {
    this.getData()
  },

  methods: {
    getData() {
      axios.get('http://localhost:8080/auth/user')
          .then(res => {
            this.dataUser = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getEdit(dataUser) {
      this.dialogEdit = true
      this.idUsername = dataUser.id
      this.username = dataUser.username
      this.role = dataUser.role
      this.password = dataUser.password


    },
    updateProduct() {
      const id = this.idUsername
      console.log(id)
      axios.put(`http://localhost:8080/auth/user/${id}`, {
        data: {
          id: this.idUsername
        },
        "username":this.username,
        "role": this.role,
        "password": this.password,
      })
          .then(res => {
            this.getData();
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
