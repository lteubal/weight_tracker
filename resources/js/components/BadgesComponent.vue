<template>
  <div>
    <v-layout row class="ma-1">
      <v-flex xs6 sm6 md6 >
       <badge-component :badge="badge1" />
      </v-flex>
      <v-flex xs6 sm6 md6 >
        <badge-component :badge="badge2" />
      </v-flex>
      <v-flex xs6 sm6 md6 >
        <badge-component :badge="badge3" />
      </v-flex>
      <v-flex xs6 sm6 md6 >
        <badge-component :badge="badge4" />
      </v-flex> 
    </v-layout>
  </div>
</template>

<script>
import BadgeComponent  from './BadgeComponent';
export default {
  name: "BadgesComponent",
  components: {
    BadgeComponent
  },
  data() {
    return {
      badge1: {text: "Current Weight", value: "190.20 lbs", color: "red lighten-3", icon: 'emoji_people' },
      badge2: {text: "Desired Weight", value: "170.20 lbs", color: "blue lighten-3" , icon: 'directions_run' },
      badge3: {text: "Healthy BMI Range", value: "140 lbs to 180 lbs", color: "green lighten-3" , icon: 'transfer_within_a_station' },
      badge4: {text: "Ideal Weight", value: "160.20 lbs", color: "orange lighten-3" , icon: 'accessibility_new' }
    }
  }
}
</script>

<style>

</style>