import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import "@/plugins/vuePlugins";

Vue.config.productionTip = false;
import router from "@/router";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
