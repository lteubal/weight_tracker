<template>
<v-hover v-slot:default="{ hover }" :disabled="false" :value="false">
  <v-sheet :elevation="hover ? 5 : 2">
    <span class="font-weight-bold header ml-3 grey--text">Weight History Chart</span>
    <v-sparkline :value="value" :gradient="gradient" :smooth="radius || false" :padding="padding" :line-width="width" :stroke-linecap="lineCap" :show-labels="true" :labels="labels" :gradient-direction="gradientDirection" :fill="fill" :type="type" :label-size="labelSize" :auto-line-width="autoLineWidth" auto-draw>
    </v-sparkline>
  </v-sheet>
</v-hover>
</template>

<script>

import * as constants from '../constants';

import {
  mapGetters
} from 'vuex';

export default {
  data: () => ({
    wUnit: 'lbs',
    width: 2,
    radius: 10,
    padding: 18,
    labelSize: '3',
    lineCap: 'round',
    gradient: ['#d4190f', '#d4190f', '#19c910', , '#19c910', '#1221c7'],
    value: [],
    labels: [],
    gradientDirection: 'top',
    fill: false,
    type: 'trend',
    hover: 2,
    autoLineWidth: false,
  }),
  created: function () {
    this.updateChartValues();
  },
  computed: {
    ...mapGetters([
      'getWeights', 'weightUnit', 'heightUnit',
    ]),
  },
  watch: {
    getWeights() {
      this.updateChartValues();
    },
    weightUnit() {
      this.updateChartValues();
    }
  },
  methods: {
    updateChartValues() {
      let val = [];
      let lab = [];
      let entryWeight = '';
      for (const [idx, entry] of Object.values(this.$store.getters.getWeights).entries()) {
        if (this.weightUnit == "lbs") {
          entryWeight = entry.weight;
        } else {
          entryWeight = (entry.weight * constants.RATIO_LBS_TO_KG).toFixed(2);
        }
        val.push(+entryWeight);

        if (idx == 0 || idx == Object.values(this.$store.getters.getWeights).length - 1) {
          let FormattedDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US');
          lab.push(FormattedDate + " - " + entryWeight + " " + this.weightUnit);
        } else {
          lab.push(" ");
        }
      }
      let valuesReversed = val.reverse();
      let labelsReversed = lab.reverse();

      this.value = valuesReversed;
      this.labels = labelsReversed;
    }
  }
}
</script>
