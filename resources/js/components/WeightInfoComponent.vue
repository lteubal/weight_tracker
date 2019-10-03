<template>
<div class="main-weight-info-dashboard" v-bind:class="{'main-weight-info': standAlone}">
  <v-hover v-slot:default="{ hover }" :disabled="false" :value="false">
    <v-card :elevation="hover ? 6 : 2" class="mx-4 my-0 gauge-card" light>

      <div id="chart">
        <highcharts class="gauge-chart" :options="chartOptions"></highcharts>
      </div>
      <v-card-title primary-title class="justify-center">
        <div>
          <h3 class="headline mb-0">Body Mass Index </h3>
          <br>
          <div class="headline font-weight-bold text--darken-2" :class="getCurrentBMILevelColor"> {{ getCurrentBMI }} - {{ getCurrentBMILevel }}</div>
          <br>
        </div>
      </v-card-title>
    </v-card>
  </v-hover>
</div>
</template>

<script>
import {
  Chart
} from 'highcharts-vue';

export default {
  name: "WeightInfoComponent",
  components: {
    highcharts: Chart
  },
  methods: {
    setGaugeValueToBMI() {
      let bmi = +this.$store.getters.getCurrentBMI;
      if (bmi > 39.9) {
        bmi = 39.9;
      }
      this.chartOptions.series[0].data = [bmi];
    }
  },
  computed: {
    getCurrentBMI() {
      this.setGaugeValueToBMI();
      return this.$store.getters.getCurrentBMI;
    },
    getCurrentBMILevel() {
      return this.$store.getters.getCurrentBMILevel;
    },
    getCurrentBMILevelColor() {
      return this.$store.getters.getCurrentBMILevelColor;
    },
    standAlone() {
      return this.$route.path != '/home';
    },
  },
  mounted: function () {
    this.setGaugeValueToBMI();
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'gauge',
          backgroundColor: '#eee',
        },
        title: null, 
        pane: {
          center: ['52.4%', '90%'],
          size: '180%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: '#DDD',

            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },
        tooltip: {
          enabled: false
        },

        // the value axis
        yAxis: {
          stops: [
            [0.33, '#3238a8'], // blue
            [0.66, '#55BF3B'], // green
            [0.99, '#DF5353'] // red
          ],
          lineWidth: 0,
          minorTickInterval: null,
          tickAmount: 2,
          title: {
            y: -120
          },
          labels: {
            y: 16
          }

        },

        plotOptions: {
          gauge: {
            dataLabels: {
              y: -325,
              borderWidth: 0,
              useHTML: true
            }
          }
        },

        yAxis: {
          min: 3,
          max: 39.9,
          title: {
            text: 'BMI'
          },
          plotBands: [{
            from: 3,
            to: 18.5,
            color: '#3238a8' // blue
          }, {
            from: 18.5,
            to: 25,
            color: '#55BF3B' // green
          }, {
            from: 25,
            to: 39.9,
            color: '#DF5353' // red
          }]
        },

        credits: {
          enabled: false
        },
        series: [{
          name: 'BMI',
          data: [0],
          dataLabels: {
            format: '<div style="text-align:center">' +
              '<span style="font-size:25px;">{y}</span><br/>' +
              '<span style="font-size:12px;opacity:0.4"></span>' +
              '</div>'
          },
          tooltip: {
            valueSuffix: ' '
          }
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

$colorBack: #eee;

.bmi {
  color: #00897B;
  font-weight: bold;
  font-family: Roboto, sans-serif;
  font-size: 1.8rem;
}

.gauge-chart {
  height: 240px;
  width: 400px;
  padding-top: 20px;
  margin: 0px auto;
}

.gauge-card {
  padding-top: 20px;
  text-align: center;
  display: inline; 
  background: $colorBack;
}

.main-weight-info-dashboard {
  margin-top: 20px;
  margin-bottom: 20px;
  background: $colorBack;
}

.main-weight-info {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  background: inherit;
  .v-card {
    min-width: 1000px;
  }
}
</style>
