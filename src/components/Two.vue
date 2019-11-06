<style scoped>
  #twoDiv{
    width:300px;
    height: auto;
    float: left;
    border: 1px solid orangered;
  }
</style>

<template>
  <div style="height:800px;">
    <div id="twoDiv">
      <h2>{{msg}}</h2>
      <span v-on:click="test">测试axios请求</span><br/>
    </div>
    <div>
      <el-date-picker
        v-model="rangeTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="success" v-on:click="showTime">确认</el-button>
    </div>
    <a>{{1 | check}}</a><br/>
    <a v-html="$options.filters.check(1)"></a><br/>
    <input type="text" v-model="firstname">+
    <input type="text" v-model="lastname">=
    <input type="text" v-model="fullname">
    <input type="text" v-model="name"><br/>
    <span>{{calc(1)}}</span><br/>
    <span>state:{{this.$store.state.count}}</span><br/>
    <span>getters:{{this.$store.getters.getStateCount}}</span><br/>
  </div>
</template>

<script>
  import axios from 'axios';

    export default {
      name: "Two",
      data(){
        return{
          msg:'Two Page',
          rangeTime:'',
          firstname: '',
          lastname: '',
          fullname: ''
        }
      },
      methods:{
        test(){
          axios({
            method:'get',
            url:'https://api.apiopen.top/singlePoetry'
          }).then(function (response) {
            alert(response);
          }).catch(function (error) {
            console.log(error);
          })
        },
        showTime(){
          alert(this.rangeTime);
        }
      },
      filters:{
        check(num){
          if (num==1){
            //return '&lt;a href="#"&gt;哈哈&lt;/a&gt;';
            return "<a>haha</a>"
          }else {
            return "<a>biubiu</a>"
          }
        }
      },
      watch:{
        'firstname':function (newVal,oldVal) {
          this.fullname = newVal +"-"+this.lastname;
        },
        'lastname':function (newVal,oldVal) {
          this.fullname = this.firstname +"-"+ newVal;
        }
      },
      computed:{
        'name':function () {
          return this.firstname+"-"+this.lastname;
        },
        calc(){
          return function (num) {
            return num+1;
          }
        }
      }
    }
</script>


