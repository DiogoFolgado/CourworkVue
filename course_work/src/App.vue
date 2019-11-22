<template>
  <div class="center-content" id="scrollTop">
    <router-view class="content" />
    <Footer />
  </div>
</template>

<script>
  import Footer from 'components/Shared/Footer'

  export default {
    components: {
      Footer
    },
    mounted() {
      window.onscroll = function() {
        myFunction()
      };

      var header = document.getElementById("header");
      var sticky = header.offsetTop;

      function myFunction() {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    }
  }
</script>
