<template>
<div>
  <v-card v-if="!editMode" color="grey lighten-5" light text hover>
    <v-card-title primary-title>
      <div class="subtitle-3 text-left">
        <v-avatar size="55" v-if="avatar">
          <img :src="avatar">
        </v-avatar>
        <span>{{ fullname }}</span>

        <div class="subtitle-2 grey--text "><span v-if="avatar" class="ml-12"></span>{{ email }}</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn small text>
        <v-icon small left class="mx-1" title="Edit" @click="editMode = true">edit</v-icon>
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
          <br>
          <div class="grey--text info-text">System Units: {{ system }}</div>
        </v-flex>
        <v-flex xs5>
          <div class="grey--text info-text">Activity Level:
            <v-progress-circular :value="getUser.activity_level" color="blue-grey" class="ml-2">{{ getUser.activity_level }}
            </v-progress-circular>
          </div>
          <br>
          <div class="grey--text info-text">Gender: {{ gender }}</div>
          <br>
          <div class="grey--text info-text">Desired Weight: {{ desiredWeight }}</div>
        </v-flex>
        <v-flex xs1>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>

  <v-card v-if="editMode" color="grey lighten-5" light text hover>
    <v-card-text primary-title>
      <div class="subtitle-3 text-left">
        <div v-if="avatar">
          <v-layout row>
            <v-flex xs1>
            </v-flex>
            <v-flex xs2>
              <v-avatar size="55">
                <img :src="avatar">
              </v-avatar>
            </v-flex>
            <v-flex xs7>
              <v-file-input  v-model='files'  @change="handleFileUpload()" prepend-icon="mdi-camera" :rules="rulesAvatar" accept="image/png, image/jpeg, image/bmp" label="Avatar" placeholder="Pick new avatar to replace it"></v-file-input>
            </v-flex>
            <v-flex xs1 class="text-right">
              <v-btn x-small text>
                <v-btn x-small icon color="black">
                  <v-icon @click="updateUser()" small left class="mx-1" title="Save">save</v-icon>
                </v-btn>
              </v-btn>
            </v-flex>
            <v-flex xs1>
              <v-btn x-small icon color="black">
                <v-icon small left class="mx-1" @click="undoEditting()" title="Undo">undo</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs1>
            </v-flex>
          </v-layout>
        </div>
        <div v-else>
          <v-layout row>
            <v-flex xs1>
            </v-flex>
            <v-flex xs8>
              <v-file-input prepend-icon="mdi-camera" :rules="rulesAvatar" accept="image/png, image/jpeg, image/bmp" label="Avatar" placeholder="Pick an avatar"></v-file-input>
            </v-flex>
            <v-flex xs1 class="text-right">
              <v-btn x-small text>
                <v-btn x-small icon color="black">
                  <v-icon @click="updateUser()" small left class="mx-1" title="Save">save</v-icon>
                </v-btn>
              </v-btn>
            </v-flex>
            <v-flex xs1>
              <v-btn x-small icon color="black">
                <v-icon small left class="mx-1" @click="undoEditting()" title="Undo">undo</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs1>
            </v-flex>
          </v-layout>
        </div>
        <v-layout row>
          <v-flex xs1>
          </v-flex>
          <v-flex xs5>
            <v-text-field v-model="name" label="Name"></v-text-field>
          </v-flex>
          <v-flex xs1>
          </v-flex>
          <v-flex xs5>
            <v-text-field v-model="lastName" label="Last Name"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs1>
          </v-flex>
          <v-flex xs11>
            <v-text-field v-model="email" label="Email"></v-text-field>
          </v-flex>
        </v-layout>
      </div>
      <v-spacer></v-spacer>

      <v-layout row>
        <v-flex xs1>
        </v-flex>
        <v-flex xs4 class="mr-40">
          <div class="grey--text info-text">
            Birthdate
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="birthdate" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="birthdate" style="margin-top: 32px;" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="birthdate" scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(birthdate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <br>
          <div class="grey--text info-text" style="margin-top: 16px;">Height:
            <div class="grey--text info-text">
              <v-layout row>
                <v-flex xs1>
                </v-flex>
                <v-flex xs4>
                  <v-select v-model="feet" :items="feetList" label="Feet"></v-select>
                </v-flex>
                <v-flex xs2>
                </v-flex>
                <v-flex xs4>
                  <v-select v-model="inches" :items="inchesList" label="Inches"></v-select>
                </v-flex>
                <v-flex xs1>
                </v-flex>
              </v-layout>
            </div>
          </div>
          <br>
          <div class="grey--text info-text" style="margin-top: 16px;">System Units:
            <div class="grey--text info-text">
              <v-layout row>
                <v-flex xs1>
                </v-flex>
                <v-flex xs11>
                  <template>
                    <v-container fluid>
                      <v-radio-group v-model="system" column>
                        <v-radio label="Standard" value="Standard"></v-radio>
                        <v-radio label="Metric" value="Metric"></v-radio>
                      </v-radio-group>
                    </v-container>
                  </template>
                </v-flex>
              </v-layout>
            </div>
          </div>
        </v-flex>
        <v-flex xs1>
        </v-flex>
        <v-flex xs5>
          <div class="grey--text info-text">Activity Level
            <span class="caption"><br>(0 = sedentary - 100: very active)<br><br></span>
            <v-slider v-model="activityLevel" thumb-label="always" :thumb-size="24" step="5" :max="100"></v-slider>
          </div>
          <br>
          <div class="grey--text info-text">Gender
            <v-select v-model="gender" :items="genderList"></v-select>
          </div>
          <br>
          <div class="grey--text info-text mt-4">Desired Weight
            <v-text-field suffix="lbs" v-model="desiredWeight"></v-text-field>
          </div>
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
  data() {
    return {
      editMode: false,
      name: '',
      lastName: '',
      email: '',
      system: 'Standard',
      desiredWeight: 0, 
      files: null,
      genderList: ['Male', 'Female', ' - '],
      gender: '',
      feet: 5,
      inches: 4,
      feetList: [4, 5, 6, 7],
      inchesList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      editMode: false,
      menu: false,
      birthdate: '',
      activityLevel: 10,
      avatar: '',
      rulesAvatar: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    fullname() {
      return this.getUser.name + ' ' + this.getUser.last_name;
    },
    birthdateFormatted() {
      let FormattedDate = new Date(this.getUser.birthdate + 'T00:00:00').toISOString().substr(0, 10);
      return FormattedDate;
    },
    getGender() {
      return this.getUser.gender.charAt(0).toUpperCase() + this.getUser.gender.slice(1).toLowerCase();
    },
    getSystem() {
      return this.getUser.system.charAt(0).toUpperCase() + this.getUser.system.slice(1).toLowerCase();
    },
    height() {
      let feet = Math.floor(this.getUser.height_in_inches / 12);
      let inches = this.getUser.height_in_inches % 12;
      this.feet = feet;
      this.inches = Math.round(inches);
      return `${this.feet}' ${this.inches}"`;
    },

  },
  methods: {
    updateUser() {
      let element = {};
      element.id = this.getUser.id;
      element.name = this.name;
      element.last_name = this.lastName;
      element.email = this.email;
      element.desired_weight = +this.desiredWeight;
      element.height_in_inches = +this.feet * 12 + this.inches;
      element.gender = this.gender;
      element.birthdate = this.birthdate;
      element.activity_level = +this.activityLevel;
      element.system = this.system;
      element.avatar = this.avatar;
      this.handleFileUpload();
      this.$store.dispatch('updateUser', element);
      this.editMode = false;
    },
    undoEditting() {
      this.editMode = false;
    },
    handleFileUpload(){ 
      console.log(this.files);
    }
  },
  mounted: function () {
    this.birthdate = this.birthdateFormatted;
    this.activityLevel = this.getUser.activity_level;
    this.name = this.getUser.name;
    this.lastName = this.getUser.last_name;
    this.email = this.getUser.email;
    this.gender = this.getGender;
    this.system = this.getSystem;
    this.desiredWeight = this.getUser.desired_weight;
    this.avatar = this.getUser.avatar;
  }
}
</script>

<style scoped>
.info-text {
  line-height: 30px;
}
</style>
