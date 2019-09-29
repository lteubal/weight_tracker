<template>
<v-hover v-slot:default="{ hover }" :disabled="false" :value="false">
  <v-card :color="badge.color" light max-width="344" class="mx-3 my-3" :elevation="hover ? 6 : 2">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <v-icon>{{ badge.icon }}</v-icon>
          {{ badge.text }}
        </v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <span class="title font-weight-bold grey--text text--darken-2">{{ badgeValue }} {{ weightUnit }}</span>
    </v-card-text>
  </v-card>
</v-hover>
</template>

<script>
export default {
  name: "BadgeComponent",
  props: ['badge', 'badgeValue', 'weightUnit']
}
</script>
