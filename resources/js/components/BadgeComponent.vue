<template>
   <v-card :color="badge.color" light   v-ripple="{ center: true }"
      max-width="344"
      class="mx-3 my-1"
    >
      <v-list-item > 
        <v-list-item-content>
          <v-list-item-title class="title" >
             <v-icon>{{ badge.icon }}</v-icon>
             {{ badge.text }}
            </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> 
      <v-card-text>
        <span class="headline font-weight-bold grey--text text--darken-2">{{  badge.value }}</span> 
      </v-card-text> 
    </v-card>
</template>

<script>
export default {
  name: "BadgeComponent",
  props: ['badge']
}
</script>

<style>

</style>