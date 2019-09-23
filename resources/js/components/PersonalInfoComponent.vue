<template>
  <div>
     <v-card color="grey lighten-5" light text hover>  
        <v-card-title primary-title > 
            <div class="subtitle-3 text-left"> 
              <v-avatar size="55">
                <img :src="item.avatar">
              </v-avatar> 
              <span>{{ item.header }}</span>
             
            </div>       <v-spacer></v-spacer>
          <v-btn small text> 
            <v-icon x-small left>folder</v-icon>
            Edit
          </v-btn> 
        </v-card-title>
        <v-card-text primary-title class=" text-left"> 
            <v-divider></v-divider>
            <div class="grey--text">Birthdate: {{ item.birthdate }}</div> 
            <div class="grey--text">Gender: {{ item.gender}}</div>
            <div class="grey--text">Height: {{ item.height}}</div>
        </v-card-text>
 
      </v-card>
       
  </div>
</template>

<script>
export default {
  name: "PersonalInfoComponent",
  data() {
    return {
      item: {header: "John Doe", birthdate: "5th July 1980", gender: "Male", height: "5' 3''", avatar: "/images/avatar.png"}
    }
  }
}
</script>

<style>

</style>