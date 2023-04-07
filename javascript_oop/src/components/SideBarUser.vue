<template>
  <v-navigation-drawer app dark class="sideBar">
    <div class="text-center mt-5">
      <v-img
          class="mx-auto"
          src="@/assets/image/tas.png"
          height="60px"
          width="80px"
      ></v-img>
      <v-divider color="white" class="mt-4"></v-divider>
    </div>

    <v-list-item @click="logOut" class="pl-10">
      <v-list-item-icon>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title> Log Out</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 0,
  }),
  methods:{
    logOut() {
      sessionStorage.removeItem('token');
      this.$router.push('/')
    },
  }
};
</script>

<style>
.text-sidebar {
  font-family: "Poppins", sans-serif;
}
.list-card{
  margin-bottom: 35vh;
}
.sideBar{
  background-color:  #7F7F7F !important;
}
</style>
