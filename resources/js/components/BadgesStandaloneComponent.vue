<template>
<div>
  <v-container>
    <v-row class="ma-0 pa-0 main-badges">
      <v-col>
        <badge-component :badge="badge1" :badgeValue="getCurrentWeight" :unit="weightUnit" />
      </v-col>
      <v-col>
        <badge-component :badge="badge2" :badgeValue="desired_weight" :unit="weightUnit" />
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0  main-badges">
      <v-col>
        <badge-component :badge="badge3" :badgeValue="healthyBMIRange" :unit="weightUnit" />
      </v-col>
      <v-col>
        <badge-component :badge="badge4" :badgeValue="idealWeight" :unit="weightUnit" />
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0  main-badges">
      <v-col>
        <badge-component :badge="badge5" :badgeValue="caloriesNeeded" :unit="calorieUnit" />
      </v-col>
      <v-col>
        <badge-component :badge="badge6" :badgeValue="caloriesToLoseOnePound" :unit="calorieUnit" />
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import * as constants from '../constants';

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
      'getCurrentWeight', 'getCurrentWeightInLbs', 'getCurrentWeightInKg', 'getUser', 'getAge', 'weightUnit', 'heightUnit',
    ]),
    standAlone() {
      return this.$route.path != '/home';
    },
    desired_weight() {
      let desired_weight = 0;
      if (this.weightUnit == "lbs") {
        desired_weight = this.getUser.desired_weight;
      } else {
        desired_weight = this.getUser.desired_weight * constants.RATIO_LBS_TO_KG;
      }
      return Math.round(desired_weight);
    },
    idealWeight() {
      let lemmens_equation = this.kgToPounds(22 * this.inchesToMeters(this.getUser.height_in_inches) * this.inchesToMeters(this.getUser.height_in_inches));
      if (this.weightUnit != "lbs") {
        lemmens_equation = lemmens_equation * constants.RATIO_LBS_TO_KG;
      }
      return lemmens_equation.toFixed(2);
    },
    healthyBMIRange() {
      let bmi_formula_min = (18.5 / 703) * this.getUser.height_in_inches * this.getUser.height_in_inches;
      let bmi_formula_max = (24.9 / 703) * this.getUser.height_in_inches * this.getUser.height_in_inches;
      if (this.weightUnit != "lbs") {
        bmi_formula_min = bmi_formula_min * constants.RATIO_LBS_TO_KG;
        bmi_formula_max = bmi_formula_max * constants.RATIO_LBS_TO_KG;
      }
      let bmi_formula_min_rounded = bmi_formula_min.toFixed(0);
      let bmi_formula_max_rounded = bmi_formula_max.toFixed(0);
      return bmi_formula_min_rounded + " to " + bmi_formula_max_rounded;
    },
    caloriesNeeded() {
      let totalDailyNeeds = 0;
      if (this.getUser.gender.toLowerCase() == "female") {
        const bmr = 655 + (4.3 * this.getCurrentWeightInLbs) + (4.7 * this.getUser.height_in_inches) - (4.7 * this.getAge);
        totalDailyNeeds = bmr * this.getUser.activity_level / 100 + bmr;
      } else {
        const bmr = 66 + (6.3 * this.getCurrentWeightInLbs) + (12.9 * this.getUser.height_in_inches) - (6.8 * this.getAge);
        totalDailyNeeds = bmr * this.getUser.activity_level / 100 + bmr;
      }
      return Math.round(totalDailyNeeds);
    },
    caloriesToLoseOnePound() {
      return this.caloriesNeeded - 500;
    }
  },
  data() {
    return {
      calorieUnit: 'calories',
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
      },
      badge5: {
        text: "Daily calorie needs",
        color: "brown lighten-3",
        icon: 'fastfood'
      },
      badge6: {
        text: "Lose 1 lb/week",
        color: "pink lighten-3",
        icon: 'arrow_downward'
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

<style lang="scss" scoped>
.main-badges .col {
  text-align: center;

  .v-card {
    max-width: 800px !important;
  }
}

.container {
  background: #c7c7c76e;
  width: 1000px;
}
</style>
