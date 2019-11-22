<template>
  <div class="full-width center-content">
    <Header id="header" style="z-index:1"/>
    <UsersData />
  </div>
</template>

<script>
import UsersData from 'components/Shared/UsersData'
import Header from 'components/Shared/Header'
export default {
  components: {
    Header,
    UsersData
  },
  mounted() {
    window.scrollTo(0, 0);
    if(!localStorage.getItem('access_token')) {
      this.$router.push('/signIn');
    }
  }
}

</script>
