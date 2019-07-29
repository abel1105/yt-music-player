import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { MdIcon, MdProgress } from 'vue-material/dist/components';

import 'normalize.css';
import 'vue-material/dist/vue-material.min.css';

Vue.config.productionTip = false;

Vue.use(MdIcon);
Vue.use(MdProgress);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
