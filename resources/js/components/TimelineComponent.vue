<template>
  <div>
    <v-card color="grey lighten-5" light text hover>  
        <v-card-text primary-title > 
          <v-timeline right clipped light class="aligned-left">  
      
            <v-timeline-item right class="mb-4" color="red" small>

              <v-row justify="space-between" class="black--text">
                <v-col cols="7">
                  <span :class="`headline font-weight-bold red--text`">180.20</span>
                  <span :class="`title   darkgray--text`">lbs</span>
                </v-col>
                <v-col class="text-right" cols="5">
                  <v-btn x-small text>
                    <v-icon x-small left>edit</v-icon>
                    <span >Modify</span>
                  </v-btn> 
                </v-col>
              </v-row>
              <template v-slot:opposite>
                <span
                  :class="`subheading font-weight-bold red--text`" 
                >Dec 06</span> <div
                  :class="`subheading font-weight-bold darkgray--text`" 
                >2019</div> 
              </template>
            </v-timeline-item>
      
            <v-timeline-item right class="mb-4" color="green" small>
              <v-row justify="space-between" class="black--text">
                <v-col cols="7">
                  <span :class="`headline font-weight-bold green--text`">181.20</span>
                  <span :class="`title   darkgray--text`">lbs</span>
                </v-col>
                <v-col class="text-right" cols="5">
                  <v-btn x-small text>
                    <v-icon x-small left>edit</v-icon>
                    <span >Modify</span>
                  </v-btn> 
                </v-col>
              </v-row>
              <template v-slot:opposite>
                <span
                  :class="`subheading font-weight-bold green--text`" 
                >Dec 07</span> <div
                  :class="`subheading font-weight-bold darkgray--text`" 
                >2019</div> 
              </template>
            </v-timeline-item>
      
            <v-timeline-item right class="mb-4" color="blue" small>
              <v-row justify="space-between" class="black--text">
                <v-col cols="7">
                  <span :class="`headline font-weight-bold blue--text`">178.30</span>
                  <span :class="`title   darkgray--text`">lbs</span>
                </v-col>
                <v-col class="text-right" cols="5">
                  <v-btn x-small text>
                    <v-icon x-small left>edit</v-icon>
                    <span >Modify</span>
                  </v-btn> 
                </v-col>
              </v-row>
              <template v-slot:opposite>
                <span
                  :class="`subheading font-weight-bold blue--text`" 
                >Dec 08</span> <div
                  :class="`subheading font-weight-bold darkgray--text`" 
                >2019</div> 
              </template>
            </v-timeline-item>
      
          </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TimelineComponent",
}
</script>

<style scoped>
.aligned-left {
  position: relative;
  left: -60px;
}
.darkgray--text {
  color: #BDBDBD;
}
</style>