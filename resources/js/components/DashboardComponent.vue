<template>
<v-container>
  <v-row class="ma-0 pa-0 main-badges">
    <v-col>
      <v-card v-if="hasWeights" light tile flat color="white" >
        <chart-component />
      </v-card>
    </v-col>
  </v-row>
  <v-row class="ma-0 pa-0 main-badges">
    <v-col>
      <v-card light tile flat color="white" >
        <timeline-component />
      </v-card>
    </v-col>
    <v-col>
      <v-row no-gutters >
        <v-col>
          <v-card light tile flat color="white" >
            <personal-info-component />
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="hasWeight && hasHeight">
        <v-col>
          <v-card v-if="hasWeights" light tile flat color="white" >
            <weight-info-component />
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="hasWeight && hasHeight">
        <v-col>
          <v-card v-if="hasWeights" light tile flat class="badges-card" >
            <badges-component />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</v-container> 
</template>

<script>
import ChartComponent from './ChartComponent';
import TimelineComponent from './TimelineComponent';
import WeightInfoComponent from './WeightInfoComponent';
import PersonalInfoComponent from './PersonalInfoComponent';
import BadgesComponent from './BadgesComponent';
import DashboardComponent from './DashboardComponent';

export default {
  components: {
    ChartComponent,
    TimelineComponent,
    PersonalInfoComponent,
    WeightInfoComponent,
    BadgesComponent,
    DashboardComponent
  },
  computed: {
    hasWeights() {
      return Object.values(this.$store.getters.getWeights).length - 1 >= 2;
    },
    hasWeight() {
      return Object.values(this.$store.getters.getWeights).length > 0;
    },
    hasHeight() {
      return this.$store.getters.getUser.height_in_inches;
    }
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  })
}
</script>

<style scoped>
  .badges-card {
    background:#c7c7c76e;
    text-align: center;
  }
</style>
