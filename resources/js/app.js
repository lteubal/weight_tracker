// require('./bootstrap');
window.Vue = require('vue');
import Vuex from 'vuex';
import VueRouter from 'vue-router';

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
Vue.use(VueRouter);

import ChartComponent from './components/ChartComponent';
import TimelineComponent from './components/TimelineComponent';
import PersonalInfoComponent from './components/PersonalInfoComponent';
import DashboardComponent from './components/DashboardComponent';
import WeightBadgesComponent from './components/WeightBadgesComponent';

Vue.component('main-component', require('./components/MainComponent.vue').default);

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/home',
      name: 'DashboardComponent',
      component: DashboardComponent,
    },
    {
      path: '/personal-info',
      name: 'PersonalInfoComponent',
      component: PersonalInfoComponent,
    },
    {
      path: '/chart',
      name: 'ChartComponent',
      component: ChartComponent
    },
    {
      path: '/timeline',
      name: 'TimelineComponent',
      component: TimelineComponent
    },
    {
      path: '/weight-info',
      name: 'WeightBadgesComponent',
      component: WeightBadgesComponent
    },
  ],
});

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
  }),
  router,
});