// require('./bootstrap');
window.Vue = require('vue');
import Vuex from 'vuex'

import '@mdi/font/css/materialdesignicons.css';

import Vuetify from 'vuetify';
import store from './store';
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import highchartsMoreInit from "highcharts/highcharts-more";
import solidGaugeInit from "highcharts/modules/solid-gauge";

highchartsMoreInit(Highcharts);
solidGaugeInit(Highcharts);

Vue.use(Vuetify);
Vue.use(HighchartsVue);

Vue.component('main-component', require('./components/MainComponent.vue').default);
Vue.mixin({
  methods: {
    allowOnlyNumbers($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    },
    getDay: function(date) {
      let newDate = new Date(date + 'T00:00:00');
      return newDate.getDate();
    },
    getMonth: function(date) {
      let newDate = new Date(date + 'T00:00:00');
      return newDate.toLocaleString('default', {
        month: 'short'
      }).toUpperCase();
    },
    getYear: function(date) {
      let newDate = new Date(date + 'T00:00:00');
      return newDate.getFullYear();
    }
  }
})

const app = new Vue({
  store,
  el: '#app',
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
  }),
  data: () => ({
    drawer: null
  })
})