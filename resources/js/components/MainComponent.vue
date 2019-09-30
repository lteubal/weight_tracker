<template>
<v-app id="inspire">
  <v-navigation-drawer v-model="drawer" app dark color="grey darken-2">
    <v-list dense>
      <v-list-item @click="">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="">
        <v-list-item-action>
          <v-icon>mdi-contact-mail</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app color="grey darken-1" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Weight Tracker </v-toolbar-title>
  </v-app-bar>

  <v-content class="grey lighten-2">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 order-ls1>
          <v-card v-if="hasWeights" light tile flat color="white" class="chart-box">
            <chart-component />
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm12 md6>
          <v-card dark tile flat color="error">
            <v-card-text class="pa-0">
              <p class="text-center">
                <v-layout column class="pa-0">
                 
                  <v-flex xs12 sm12 md6>
                    <v-card tile flat color="grey lighten-2">
                      <v-card-text class="pt-1">
                        <p class="text-center">
                          <timeline-component />
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md6>
          <v-card dark tile flat color="error">
            <v-card-text class="pa-0">
              <p class="text-center">
                <v-layout column class="pa-0">
                   <v-flex xs12 sm12 md6>
                    <v-card tile flat color="grey lighten-2">
                      <v-card-text class="pb-1">
                        <p class="text-center">
                          <personal-info-component />
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex v-if="hasWeight && hasHeight" xs12 sm12 md6>
                    <v-card tile flat color="grey lighten-2">
                      <v-card-text class="pb-1">
                        <p class="text-center">
                          <weight-info-component />
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex v-if="hasWeight && hasHeight" xs12 sm12 md6>
                    <v-card tile flat color="grey lighten-2">
                      <v-card-text class="pt-1 mt-">
                        <p class="text-center">
                          <badges-component />
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </p>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>

    </v-container>
  </v-content>

</v-app>
</template>

<script>
 import ChartComponent from './ChartComponent';
 import TimelineComponent from './TimelineComponent';
 import WeightInfoComponent from './WeightInfoComponent';
 import PersonalInfoComponent from './PersonalInfoComponent';
 import BadgesComponent from './BadgesComponent';

 export default {
   components: {
     ChartComponent,
     TimelineComponent,
     PersonalInfoComponent,
     WeightInfoComponent,
     BadgesComponent
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

<style>
button:focus {
  outline: 0;
}
</style>

<style scoped>
.chart-box {
  margin: 0 30px 15px 15px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  border-radius: 5px;
}
</style>
