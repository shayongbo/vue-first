<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item)  in levelList">
      <router-link :to="item.path">{{item.name}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
      name: "BreadCrumb",
      data(){
        return{
          levelList: null
        }
      },
      methods: {
        /**
         * 生成面包屑的方法
         */
        getBreadcrumb() {
          let matched = this.$route.matched.filter(item => item.name);
          this.levelList = matched;
        }
      },
      mounted() {
        this.getBreadcrumb();
      },
      watch: {
        $route(to, from) {
          this.getBreadcrumb();
        }
      }
    }
</script>

<style scoped>

</style>
