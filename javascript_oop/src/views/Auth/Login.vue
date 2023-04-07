<template>
  <v-container fluid fill-height>
    <v-layout class="align-center justify-center">
      <v-flex>
        <v-card class="card mx-auto pa-3" width="350px">
          <div class="image-logo mx-auto">
            <v-img
                class="mx-auto"
                src="@/assets/image/tas.png"
                width="150px"
            ></v-img>
          </div>
          <v-form>
            <h5 class="text-center">Data Penjualan Tas</h5>
            <template  v-if="btnRegis == true ">
              <h1 class="text-center">Login</h1>
            </template>
            <template v-else>
              <h1 class="text-center">Register</h1>
            </template>
            <!--            Bagian Text Field-->
            <div class="text-form pa-3">
              <template  v-if="btnRegis == true ">
                <v-text-field
                    v-model="username"
                    class="text-input"
                    outlined
                    hide-details
                    label="Username"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    class="text-input"
                    outlined
                    hide-details
                    :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passwordType ? 'password' : 'text'"
                    label="Password"
                    @click:append="togglePassword"
                ></v-text-field>
              </template>
              <template v-else>
                <v-text-field
                    v-model="username"
                    class="text-input"
                    outlined
                    hide-details
                    label="Username"
                ></v-text-field>
                <v-text-field
                    v-model="role"
                    class="text-input"
                    outlined
                    hide-details
                    label="Role"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    class="text-input"
                    outlined
                    hide-details
                    :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passwordType ? 'password' : 'text'"
                    label="Password"
                    @click:append="togglePassword"
                ></v-text-field>

              </template>
            </div>
            <div class="text-center">
              <template  v-if="btnRegis == true ">
                <v-btn
                    @click="handleSubmit"
                    depressed
                    large
                    rounded
                    color="#4F6499"
                    class="btn-login my-2"
                >
                  Login
                </v-btn>
              </template>
              <template v-else>
                <v-btn
                    @click="registerSubmit"
                    class="btn-login my-2"
                    depressed
                    large
                    rounded
                    color="#4F6499"
                >
                  Register
                </v-btn>
              </template>
            </div>
            <div class="text-account text-center pb-1">
              <p>
                Don’t have account?
                <template v-if ="btnRegis == true">
                  <v-btn
                      class="btnLogic"
                      @click="Regis">
                    Make it Here
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn
                      class="btnLogic"
                      @click="Regis">
                    Login Here
                  </v-btn>
                </template>
              </p>
            </div>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  name: "loginPage",
  data() {
    return {
      passwordType: true,
      username: "",
      password: "",
      role:'',
      btnRegis:true,
      dataAkun:[],
    };
  },
  methods: {
    refreshPage() {
      window.location.reload();
    },
    Regis() {
      this.btnRegis = !this.btnRegis
    },
    togglePassword() {
      this.passwordType = !this.passwordType;
    },
    registerSubmit(){
      axios.post('http://localhost:8080/auth/register', {
        "email": this.email,
        "username": this.username,
        "password": this.password,
        "role": this.role
      })
          .then(res => {
            this.dataAkun()
            this.btnRegis = false
            Swal.fire({
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 2000
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 2000
            })
          })
    },
    async handleSubmit() {
      const response = await axios
          .post("http://localhost:8080/auth/login", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            if ((res.data.role === "user")) {
              const token = res.data.token;
              sessionStorage.setItem("token", true);
              this.$router.push("/User");
            }else if((res.data.role === "admin")){
              const token = res.data.token;
              sessionStorage.setItem("token", true);
              this.$router.push("/Product");
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "looks like the username or password you entered is wrong!",
            });
          });
    },
  }

};
</script>
<style scoped>
.container {
  background-color: #E9E9E9;
}
.btn-login{
  background-color: #E9E9E9 !important;
}
.image-logo{
  background-color: #E9E9E9;
  border-radius: 50%;
  width: 100px;
  height: 100px;

}
.card {
  border-radius: 15px !important;
}

.text-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.btnLogic{
  background-color:transparent  !important;
  margin-left: 20px;
  border-radius: 20px;
}

a {
  text-decoration: none !important;
  color: #1a70d7 !important;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}
</style>
