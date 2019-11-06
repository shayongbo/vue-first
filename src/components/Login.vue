<style scoped>
  #loginDiv{
    margin: 100px auto;
    width:300px;
  }
</style>

<template>
  <div id="loginDiv">
    <form id="loginForm">
      <input type="text" v-model="user.username"/><br/><br/>
      <input type="password" v-model="user.password"/><br/><br/>
      <input type="submit" v-on:click="login" value="Login"/>
    </form>
  </div>
</template>

<script>
    import axios from 'axios';
    import Qs from 'qs';
    export default {
      name: "Login",
      data(){
        return{
            user:{
                username:'username',
                password:'password'
            }
        }
      },
      methods:{
        login(){
            if (this.user.username=='username' && this.user.password=='password'){
                sessionStorage.username = this.user.username;
                this.$router.push({path:'/home'});
            }
        }
      }
    }
</script>


