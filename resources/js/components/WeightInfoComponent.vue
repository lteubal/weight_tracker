<template>
  <div>
    <v-card class="mx-4 my-0" light> 
        <v-img  
          src="/images/bmi.png"
          aspect-ratio="2.15"
        ></v-img>

        <v-card-title primary-title class="justify-center">
          <div >  
            <h3 class="headline mb-0">Body Mass Index </h3>
            <div class="headline font-weight-bold teal--text text--darken-2"> 21 </div>
          </div>
        </v-card-title> 
      </v-card>
  </div>
</template>

<script>
export default {
  name: "WeightInfoComponent",
  data() {
    return {
      
    }
  }
}
</script>

<style>
  .bmi {
    color: #00897B;
    font-weight: bold;
    font-family: Roboto,sans-serif ;
    font-size: 1.8rem ;
  }
</style>