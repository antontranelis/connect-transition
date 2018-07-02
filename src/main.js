// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Web3 from 'web3';

import 'bootstrap/dist/css/bootstrap.css';
import '../build/css/mdb.css';
import "leaflet/dist/leaflet.css";
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";
import VueImg from 'v-img';

Vue.use(VueImg);

Vue.use(wysiwyg, {
  image: {
    uploadURL: process.env.API_URL+"/images",
    dropzoneOptions: {}
  }
});

Vue.config.productionTip = false;
Vue.use(require('vue-moment'));

window.web3Existe = false;

window.addEventListener('load', function () {
  if (typeof web3 == 'undefined') {
    console.log('Web3 injected browser: Fail. You should consider trying MetaMask.');
  } else {
    console.log('Web3 injected browser: OK.');
    window.web3Existe = true;
    window.web3 = new Web3(window.web3.currentProvider);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
