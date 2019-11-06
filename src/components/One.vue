<template>
  <div>
    <div v-show="showContent">
      <button @click="toggleModal">打开Modal对话框</button>
      <Modal  v-show="showModal"  width="700"  @on-cancel="cancel">
        <div slot="header">
          <div class="myHeader">
            <h4>我是父组件定义的标题</h4>
          </div>
        </div>
        <div slot="body" style="text-indent: 35px;">
          桃林的尽头就是溪水的发源地，于是便出现一座山，山上有个小洞口，洞里仿佛有点光亮。于是他下了船，从洞口进去了。起初洞口很狭窄，仅容一人通过。
          又走了几十步，突然变得开阔明亮了。（呈现在他眼前的是）一片平坦宽广的土地，一排排整齐的房舍。还有肥沃的田地、美丽的池沼，桑树竹林之类的。
          田间小路交错相通，鸡鸣狗叫到处可以听到。人们在田野里来来往往耕种劳作，男女的穿戴跟桃花源以外的世人完全一样。老人和小孩们个个都安适愉快，
          自得其乐。
        </div>
      </Modal>
    </div>
    <router-view/>

    <div id="div" v-if="show" ref="div">测试文本(默认隐藏)</div>
    <Button @click="toggle">显示Div</Button>
  </div>
</template>

<script>
  import Modal from './Modal.vue'
  export default {
    data () {
      return {
        showModal:false,
        showContent:true,
        show: false
      }
    },
    components:{
      'Modal':Modal
    },
    methods:{
      toggleModal() {
        this.showModal = !this.showModal;
      },
      cancel() {
        this.showModal = false;
      },
      toggle: function () {
        this.show = true;
        this.$nextTick(function () {
          var content = document.getElementById('div').innerHTML;
          this.$refs.div.style.backgroundColor = '#d6d6d6';
          alert("content = " + content)
        })
      }
    },
    beforeRouteEnter (to, from, next){
        console.log("组件内前置路由");
        next();
    }
  }
</script>

<style>
  .myHeader{
    justify-content: flex-start;
    padding: 5px;
    display: flex;
  }
</style>
