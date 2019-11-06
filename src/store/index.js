import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store =new Vuex.Store({
  state:{
    count:0
  },
  getters:{
    getStateCount:function (state) {
      return state.count+1;
    }
  },
  mutations:{
    add:function (state,n) {
      state.count = state.count+n;
    },
    reduce:function (state,n) {
      state.count = state.count-n;
    }
  },
  actions:{
    addActionFun(context,n) {
      context.commit("add",n);
    },
    reduceActionFun(context,n){
      context.commit("reduce",n);
    }
  }
});

export default store
