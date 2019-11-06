//引入vue框架
import Vue from 'vue'
//引入vue-router路由依赖
import Router from 'vue-router'
//进度条颜色
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import el from "element-ui/src/locale/lang/el";
//引入页面组件

NProgress.configure({ showSpinner: false });
//vue全局使用Router
Vue.use(Router);

const routes = [
  {
    path: '*',
    component: () => import('@/components/404')
  },
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('@/components/Login')
  },
  {
    path:'/home',
    name:'Home',
    component:()=>import('@/components/Home'),
    children:[
      {
        name:'One',
        path:'one',
        component: ()=>import('@/components/One'),
        children: [
          {
            name:'Four',
            path:'four',
            component:()=>import('@/components/Two')
          }
        ]
      },
      {
        name:'Two',
        path:'two',
        component:()=>import('@/components/Two')
      },
      {
        name:'Three',
        path:'three',
        meta:{requireAuth:true},
        component:()=>import('@/components/Three')
      },
      {
        name:'Vuex',
        path:'vuex',
        meta:{requireAuth:true},
        component:()=>import("@/components/Vuex")
      },
      {
        name:'MyComponent',
        path:'MyComponent',
        meta:{requireAuth:false},
        component:()=>import("@/components/MyComponent")
      }
      ]
  }
  ];

const router = new Router({
  mode:'history',
  routes
});

router.beforeEach((to,from,next) => {
  var username = sessionStorage.getItem("username");
  //没有登录都会跳转登录
  if (to.path != "/login" && !username) {
    next("/login");
  } else {
    //登录了跳转登录重定向到首页
    if (to.path == "/login" && username) {
      next("/home");
    } else {
      NProgress.start();
      next();
    }
  }

  // if(username){
  //   if (to.path === '/login') {
  //     next({path: '/home'})
  //   } else {
  //     next()
  //   }
  // }else {
  //   if ('/login'.indexOf(to.path) != -1){
  //     next();
  //   }else {
  //     next("/login");
  //   }
  // }
});

router.afterEach(() => {
  NProgress.done();
});

export default router

//路由参数意义
// export default new Router({
//   mode: 'history', //路由模式，取值为history与hash
//   base: '/', //基础路径，默认为/，可以修改
//   routes: [
//     {
//       path: string, //路径
//       ccomponent: Component; //页面组件
// name: string; // 命名路由-路由名称
// components: { [name: string]: Component }; // 命名视图组件
// redirect: string | Location | Function; // 重定向
// props: boolean | string | Function; // 路由组件传递参数
// alias: string | Array<string>; // 路由别名
// children: Array<RouteConfig>; // 嵌套子路由
// beforeEnter?: (to: Route, from: Route, next: Function) => void; // 路由单独钩子
// meta: any; // 自定义标签属性，比如：是否需要登录
// icon: any; // 图标
// // 2.6.0+
// caseSensitive: boolean; // 匹配规则是否大小写敏感？(默认值：false)
// pathToRegexpOptions: Object; // 编译正则的选项
// }
// ]
// })
