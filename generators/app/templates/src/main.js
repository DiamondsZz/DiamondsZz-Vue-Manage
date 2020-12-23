import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import "./plugins";
import "./assets/styles/common.css";
import store from "./store";
import initStore from "./store/initStore";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    initStore();
  },
}).$mount("#app");
