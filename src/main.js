import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import router from './router';
import store from './store';
import { MdIcon, MdProgress } from 'vue-material/dist/components';

import 'normalize.css';
import 'vue-material/dist/vue-material.min.css';
import 'animate.css';

Vue.config.productionTip = false;

Vue.use(MdIcon);
Vue.use(MdProgress);

Vue.use(VueAnalytics, {
  id: 'UA-142485991-1',
  router
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
