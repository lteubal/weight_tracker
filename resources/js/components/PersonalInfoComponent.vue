<template>
<div>
  <v-card color="grey lighten-5" light text hover>
    <v-card-title primary-title>
      <div class="subtitle-3 text-left">
        <v-avatar size="55">
          <img :src="getUser.avatar">
        </v-avatar>
        <span>{{ fullname }}</span>

      </div>
      <v-spacer></v-spacer>
      <v-btn small text>
        <v-icon small left class="mx-1" title="Edit">edit</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text primary-title class=" text-left">
      <v-divider></v-divider>
      <v-layout row>
        <v-flex xs1>
        </v-flex>
        <v-flex xs5>
          <div class="grey--text info-text">Birthdate: {{ birthdate }}</div>
          <br>
          <div class="grey--text info-text">Height: {{ height}}</div>
        </v-flex>
        <v-flex xs5>
          <div class="grey--text info-text">Activity Level:
            <v-progress-circular :value="getUser.activity_level" color="blue-grey" class="ml-2">{{ getUser.activity_level }}
            </v-progress-circular>
          </div>
          <br>
          <div class="grey--text info-text">Gender: {{ gender }}</div>

        </v-flex>
        <v-flex xs1>
        </v-flex>
      </v-layout>
    </v-card-text>

  </v-card>

</div>
</template>

<script>
export default {
  name: "PersonalInfoComponent",
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    fullname() {
      return this.getUser.name + ' ' + this.getUser.lastname;
    },
    birthdate() {
      let FormattedDate = new Date(this.getUser.birthdate + ' EDT');
      return FormattedDate.toDateString();
    },
    gender() {
      let gender = this.getUser.gender;
      let genderCapitalized = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
      return genderCapitalized;

    },
    height() {
      let feet = Math.floor(this.getUser.height_in_inches / 12);
      let inches = this.getUser.height_in_inches % 12;
      return `${feet}' ${inches}"`;
    },

  },
}
</script>

<style scoped>
.info-text {
  line-height: 30px;
}
</style>
