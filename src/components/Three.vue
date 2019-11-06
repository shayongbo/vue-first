<template>
  <div id="containDiv">
    <span v-text="count"></span><br/>
    <input v-model="message"/><br/>
    <span v-on:click="addCount()">自动+1</span><br/>
    <span v-on:click="stopCalc()">停止+1</span><br/>
    <span v-on:click="countInit()">初始化</span><br/>
    <span v-text="getStore()"></span><br/>
<!--    <div v-text="multipleSelection"></div><br/>-->

    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              border style="width: auto" highlight-current-row
              @selection-change="handleSelectionChange"
              select-on-indeterminate
              :row-key="getRowKey"
              @select="select"
              @row-click="rowClick">
      <el-table-column align="center" type="selection" :reserve-selection="true"></el-table-column>
      <el-table-column prop="id" label="ID" sortable align="center"></el-table-column>
      <el-table-column prop="date" label="日期" sortable align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable align="center"></el-table-column>
      <el-table-column prop="status" label="状态" sortable align="center">
        <template scope="scope">
          <el-tag type="info" v-if="scope.row.status === 1">{{scope.row.status | statusFilter}}</el-tag>
          <el-tag type="success" v-else-if="scope.row.status === 2">{{scope.row.status | statusFilter}}</el-tag>
          <el-tag type="warning" v-else-if="scope.row.status === 3">{{scope.row.status | statusFilter}}</el-tag>
          <el-tag type="danger" v-else>{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" sortable align="center" show-overflow-tooltip></el-table-column>
    </el-table>

    <div class="block" style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :pager-count="5"
        :total="total"
        background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import fetch from "@/util/fetch";
    export default {
      name: "Three",
      data() {
        return {
            count:0,
            timer:null,
            message:"Y",
            tableData: [],//表格数据
            multipleSelection: [],//选中项
            currentPage:1, //当前页
            total:null, //总条数
            pageSize:5 //每页条数
        };
      },
      methods: {
          addCount:function () {
              this.stopCalc();
              this.timer=setInterval(() => {
                  this.count++;
              },1000)
          },
          stopCalc:function () {
              clearInterval(this.timer);
          },
          countInit:function () {
              this.count=0;
              this.message="";
          },
          getTableData(){
              fetch.get('/local/static/data/table.json',null).then(data => {
                  this.tableData = data;
                  this.total = data.length;
              });
          },
          handleSelectionChange(val) {
              console.log(val);
              var nameArr = [];
              for (let o of val){
                  nameArr.push(o.id);
              }
              this.multipleSelection = nameArr;
              console.log(this.multipleSelection)
          },
          select(selection,row){
            console.log("select"+JSON.stringify(selection));
            console.log("select"+JSON.stringify(row));
          },
          rowClick(row,column,event){
              console.log("row:"+JSON.stringify(row));
              console.log("row:"+JSON.stringify(column));
          },
          getRowKey(row){
              return row.id;
          },
          handleSizeChange(val) {
              this.pageSize = val;
              console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
              this.currentPage = val;
              console.log(`当前页: ${val}`);
          },
          getStore(){
              return this.$store.state.count;
          }
      },
      filters:{
          statusFilter(status) {
              if (status !== '' && status !== null) {
                  const statusMap = {
                      1: '信息',
                      2: '成功',
                      3: '警告',
                      4: '危险'
                  };
                  return statusMap[status];
              }
              return '—';
          }
      },
      watch:{
          count:function () {
              this.message+='Y';
          }
      },
      created() {
          console.log("created");
      },
      mounted() {
          console.log("mounted");
          //this.$nextTick(() => {
              this.getTableData();
          //});
      }
    }
</script>
<style scoped>
#containDiv{
  width: 100%;
}
</style>
