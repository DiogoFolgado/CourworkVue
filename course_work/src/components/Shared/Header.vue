<template>
  <div class="container-fluid header">
      <div class="item1">
        <div class="name pointer" @click="gotoHome">COURSE WORK</div>
      </div>
    <div class="item2">
      <router-link to="/">Home</router-link>
    </div>
    <div class="name pointer" @click="logoutUser" v-if="logout">
      Logout
    </div>
    <div class="name pointer" v-else @click="signUp">Sign Up</div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      logout: false
    }),
    methods: {
      signUp: function() {
        this.$router.push('/signUp')
      },
      gotoHome: function() {
        this.$router.push('/')
      },
      logoutUser: function() {
        localStorage.removeItem('access_token')
        this.$router.push('/signIn')
      }
    },
    mounted() {
      if(localStorage.getItem('access_token')) {
        this.logout = true
      }
    }
  }
</script>
