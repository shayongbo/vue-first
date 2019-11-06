<template>
    <div id="vueCot">
      <span>state:{{this.$store.state.count}}</span><br/>
      <span>getters:{{this.$store.getters.getStateCount}}</span><br/>
      <el-button @click="addFun">mutation +2</el-button>
      <el-button @click="reduceFun">mutation -2</el-button><br/>
      <el-button @click="addActionFun">action +4</el-button>
      <el-button @click="reduceActionFun">action -4</el-button><br/>
      <el-button @click="login()">Sign in</el-button><br/>
      <span v-text="msg"></span><br/>
      <input type="text" v-model.trim="msg" v-focus/><br/>
      <MyComponent v-model="msg"></MyComponent>
    </div>
</template>

<style>
    #vueCot {
      margin: 20px auto;
    }
</style>

<script>
    import fetch from "@/util/fetch";
    import MyComponent from "@/components/MyComponent";
    export default {
        data() {
            return {msg: '父组件消息'}
        },
        components:{
            MyComponent
        },
        methods:{
            addFun(){
                this.$store.commit("add",2);
            },
            reduceFun(){
                this.$store.commit("reduce",2);
            },
            addActionFun(){
                this.$store.dispatch("addActionFun",4);
            },
            reduceActionFun(){
                this.$store.dispatch("reduceActionFun",4);
            },
            login() {
                var url = '/api/api/v1/users';
                fetch.get(url,null).then(value => {
                    console.log(value);
                })
            }
        },
        created() {

        },
        directives:{
          focus:{
            inserted:function (el) {
              el.focus();
            }
          }
        }
    }
</script>
