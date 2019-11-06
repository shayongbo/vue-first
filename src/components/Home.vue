<style>
  #topMenu{
    border: 1px solid dodgerblue;
    width: 100%;
    height: 50px;
    position: fixed;
    top:0px;
    z-index: 1;
  }
  #leftDiv{
    position: fixed;
    width: 100%;
    height: 100%;
    margin-top: 55px;
  }
  #leftMenu{
    border: 1px solid red;
    height:calc(100% - 60px);
    float: left;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
  }
  #content{
    border:1px solid green;
    height:calc(100% - 60px);
    display:flex;
    z-index: -1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #logout{
    float: right;
    margin-top: 10px;
    margin-right: 50px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-submenu .el-menu-item{
    text-align: center;
  }
  /*页面切换动画*/
  /*进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除*/
  .fade-enter-active {
    transition: opacity .5s;
  }
  /*进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除*/
  .fade-enter {
    opacity: 0;
  }
  /*离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除*/
  .fade-leave {
    opacity: 1;
  }
  /*离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除*/
  .fade-leave-active {
    opacity:0;
    transition: opacity .5s;
  }
  /*滚动条整体部分*/
  #content::-webkit-scrollbar{
    width:5px;
  }
  #leftMenu::-webkit-scrollbar{
    width:0px;
  }
  /*滚动条的小方块*/
  #content::-webkit-scrollbar-thumb{
    height:20px;
    background: #bfbfbf;
    border-radius:10px;
  }
  /*滚动条的轨迹*/
  #content::-webkit-scrollbar-track{
    background: white;
    border-radius:2px;
  }
  #leftMenu::-webkit-scrollbar-track{
    background: white;
  }
  /*菜单收起展开*/
  .el-radio-button__inner{
    width:64px;
  }
  /*面包屑*/
  #breadCrumb{
    position: fixed;
    z-index: 2;
    margin-top: 5px;
    margin-left: 10px;
  }
</style>

<template>
  <div id="bodyDiv">
    <div id="topMenu">
      <span id="logout" v-on:click="logout">退出</span>
      <h2>{{msg}}</h2>
    </div>
<div id="leftDiv">
    <div id="leftMenu">

      <el-radio-group v-model="isCollapse" style="float: left;position: absolute;">
        <el-radio-button v-show="isCollapse" :label="false">展开</el-radio-button>
        <el-radio-button v-show="!isCollapse" :label="true">收起</el-radio-button>
      </el-radio-group>

      <el-menu default-active="/home/one" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="margin-top: 30px;">

        <el-menu-item index="/home">
          <i class="el-icon-document"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item index="/home/one">页面一</el-menu-item>
          <el-menu-item index="/home/two">页面二</el-menu-item>
          <el-menu-item index="/home/three">页面三</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item index="/home/one">页面一</el-menu-item>
          <el-menu-item index="/home/two">页面二</el-menu-item>
          <el-menu-item index="/home/three">页面三</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item index="/home/one">页面一</el-menu-item>
          <el-menu-item index="/home/two">页面二</el-menu-item>
          <el-menu-item index="/home/three">页面三</el-menu-item>
          <el-menu-item index="/home/one/four">页面四</el-menu-item>
          <el-menu-item index="/home/vuex">Vuex</el-menu-item>
          <el-menu-item index="/home/MyComponent">MyComponent</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div id="content">
      <bread-crumb id="breadCrumb"></bread-crumb>
      <transition name="fade" mode="out-in">
        <router-view style="margin-top: 40px;"/>
      </transition>
    </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from "./BreadCrumb.vue"
    export default {
      name:'Home',
      data() {
          return {
            msg: 'Home主页面！',
            isCollapse: false
          }
      },
      components:{
        "BreadCrumb":BreadCrumb
      },
      methods:{
        logout(){
          sessionStorage.removeItem('username');
          this.$router.push({path:'/login'});
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>
