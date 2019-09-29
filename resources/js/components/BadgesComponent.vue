<template>
<div>
  <v-layout row class="ma-1 ">
    <v-flex xs6 sm6 md6>
      <badge-component :badge="badge1" :badgeValue="getCurrentWeight" :weightUnit="weightUnit" />
    </v-flex>
    <v-flex xs6 sm6 md6>
      <badge-component :badge="badge2" :badgeValue="getUser.desired_weight" :weightUnit="weightUnit" />
    </v-flex>
    <v-flex xs6 sm6 md6>
      <badge-component :badge="badge3" :badgeValue="healthyBMIRange" :weightUnit="weightUnit" />
    </v-flex>
    <v-flex xs6 sm6 md6>
      <badge-component :badge="badge4" :badgeValue="idealWeight" :weightUnit="weightUnit" />
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import BadgeComponent from './BadgeComponent';

export default {
  name: "BadgesComponent",
  components: {
    BadgeComponent
  },
  computed: {
    ...mapGetters([
      'getCurrentWeight', 'getUser'
    ]),
    idealWeight() {
      let lemmens_equation = this.kgToPounds(22 * this.inchesToMeters(this.getUser.height_in_inches) * this.inchesToMeters(this.getUser.height_in_inches));
      return lemmens_equation.toFixed(2);
    },
    healthyBMIRange() {
      let bmi_formula_min = (18.5 / 703) * this.getUser.height_in_inches * this.getUser.height_in_inches;
      let bmi_formula_max = (24.9 / 703) * this.getUser.height_in_inches * this.getUser.height_in_inches;
      let bmi_formula_min_rounded = bmi_formula_min.toFixed(0);
      let bmi_formula_max_rounded = bmi_formula_max.toFixed(0);
      return bmi_formula_min_rounded + " to " + bmi_formula_max_rounded;
    }
  },
  data() {
    return {
      weightUnit: 'lbs',
      badge1: {
        text: "Current Weight",
        color: "red lighten-3",
        icon: 'emoji_people'
      },
      badge2: {
        text: "Desired Weight",
        color: "blue lighten-3",
        icon: 'directions_run'
      },
      badge3: {
        text: "Healthy BMI Range",
        color: "green lighten-3",
        icon: 'transfer_within_a_station'
      },
      badge4: {
        text: "Ideal Weight",
        color: "orange lighten-3",
        icon: 'accessibility_new'
      }
    }
  },
  methods: {

    poundToKg(pounds) {
      return pounds * 0.45359237;
    },
    kgToPounds(kg) {
      return kg * 2.20462262185;
    },
    inchesToMeters(inches) {
      return inches / 39.37;
    },
    metersToInches(m) {
      return m * 39.37;
    }
  },

}
</script>
