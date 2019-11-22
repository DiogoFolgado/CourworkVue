<template>
  <div class="full-width center-content">
    <Header id="header" style="z-index:1"/>
    <div class="signIn">
      <h1><router-link to="/signIn">Sign Up</router-link></h1>
      <div class="signIn-box md-elevation-5">
        <div class="custom-input-group">
          <label>EMAIL</label>
          <div class="custom-field">
            <input type="text" v-model="email" placeholder="test@email.com">
            <span class="fa fa-check-circle color-green" aria-hidden="true"></span>
          </div>
          <span class="color-red" style="font-size: 15px">{{ message }}</span>
        </div>
        <div class="custom-input-group">
          <label>PASSWORD</label>
          <div class="custom-field">
            <input type="password" v-model="password" placeholder="password">
            <span class="fa fa-times-circle color-red" aria-hidden="true"></span>
          </div>
        </div>
        <div>
          <button v-on:click="signUp($event)" class="btn theme-bg">Sign Up</button>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import Header from 'components/Shared/Header'

const validateEmail = email => {
  if (!email.length) {
    return { valid: false, error: "This field is required" };
  }
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return { valid: false, error: "Please, enter a valid email." };
  }
  return { valid: true, error: null };
};

const checkUserExists = (users, email) => {
  if (!users || !users.length) {
    return false;
  }
  return users.split(",").some(uEmail => uEmail.split(":::")[0] === email);
};

export default {
  data() {
    return {
      email: '',
      message: '',
      password: ''
    }
  },
  components: {
    Header
  },
  methods: {
    signUp: function(event) {
      var validateReponse = validateEmail(this.email);
      var usersExists = checkUserExists(localStorage.getItem('users'), this.email);
      var users = localStorage.getItem('users');

      if(validateReponse.valid && !usersExists) {
        if (users && users.length) {
          localStorage.setItem('users', users+this.email+":::"+this.password+",")
        } else {
          localStorage.setItem('users', this.email+":::"+this.password+",")
        }
        this.$router.push('/');
      } else {
        if(usersExists) {
          this.message = "Email already registered"  
        } else {
          this.message = validateReponse.error     
        }
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    if(localStorage.getItem('access_token')) {
      this.$router.push('/');
    }
  }
}
</script>

<style>
  .btn {
    background: #1eb6e4 !important;
  }
  .custom-input-group {
    display: flex;
    flex-direction: column;
  }
  .custom-input-group label {
    font-size: 11px;
    color: gray;
  }
  .custom-input-group .custom-field {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 35px;
    padding: 0px 10px 0px 12px;
    border-radius: 30px;
    background-color: rgb(239,240,244)
  }
  .custom-input-group .custom-field:focus-within {
    border: 1px solid rgb(67,203,131);
  }
  .custom-input-group .color-green{
    display: flex;
    justify-content: center;
    font-size: 25px;
    margin-left: 2px;
    color: rgb(67,203,131);
  }
  .custom-input-group .color-red {
    display: flex;
    justify-content: center;
    font-size: 25px;
    margin-left: 2px;
    color: rgb(203, 67, 67);
  }
  .custom-input-group input {
    background-color: none;
    flex-grow: 1;
  }
  .signIn{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    flex-grow: 1;
    margin-top: 3vh;
  }
  .signIn img {
    width: 100px;
    margin-bottom: 3vh;
  }
  .signIn h1 {
    margin-bottom: 3vh;
    color: #1eb6e4 !important;
  }
  .signIn-box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 2vh 2vw;
    width: 45vw;
    margin-bottom: 5vh;
  }
  .signIn-box > div{
    margin: 0px 1vw;
    margin-top: 25px;
    width: 45%;
  }
  .signIn-box > div .md-field{
    background-color: #efefef;
    margin: 0 !important;
  }
  .signIn-box .btn{
    margin: auto;
    height: 35px;
    padding: 5px 0;
    padding-left: 3vw;
    padding-right: 3vw;
    border-radius:  35vh;
  }
  .signIn-box > div:nth-last-child(1){
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 15vh;
    border-top: 1px solid rgb(228, 228, 228);
  }
  @media only screen and (max-width: 600px) {
    .signIn-box {
    width: 100%;
  }
}
</style>
