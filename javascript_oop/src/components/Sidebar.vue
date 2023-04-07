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
    <v-list dense class="mt-5 list-card">
      <v-list-item-group v-model="selectedItem" color="white">
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
            v-slot="{ active }"
            class="text-sidebar"
        >
          <v-list-item-icon class="ml-6">
            <v-icon
                v-text="item.icon"
                :color="active ? 'black' : 'white'"
            ></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
                v-text="item.text"
                :class="active ? 'black--text' : 'white--text'"
                font-size="24"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

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
    items: [
      { icon: "mdi-home-outline", text: "Product", link: "/Product" },
      { icon: "mdi-web", text: "Category", link: "/Category" },
      { icon: "mdi-web", text: "Account", link: "/Account" },
      { icon: "mdi-web", text: "Log History", link: "/Log" },
    ],
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
