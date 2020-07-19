import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import './plugins/wcharts'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false
// console.log(process.env.NODE_ENV)
// Vue.prototype.baseUrl = process.env.NODE_ENV === "production" ? "http://47.75.145.199:26659/okchain/v1" : "/api"

window.VueObject = new Vue({
  router,
  store,
  render: h => h(App),

  created: function () {

  },

  // Vue 对象挂载完毕
  mounted: function () {
    // 当组建 & 子组件 挂载完毕调用 (下一个事件循环中调用)
    this.$nextTick(function () {
      // 首次初始化网络请求
      store.dispatch('apiGetBlocksFirstLaunch')
    })
  },
  i18n,
  updated: function () {
  },
  methods: {
    makeToast (title, content, variant = null) {
      this.$bvToast.toast(content, {
        title: title,
        toaster: 'b-toaster-bottom-right',
        variant: variant,
        autoHideDelay: 5000,
        appendToast: true,
        solid: true
      })
    }
  }
}).$mount('#app')
