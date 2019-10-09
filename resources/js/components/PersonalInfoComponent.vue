<template>
<div v-bind:class="{'main-personal': standAlone}">
  <v-card v-if="!editMode"   light text hover>
    <v-card-title primary-title>
      <div class="subtitle-3 text-left">
        <v-avatar size="55" v-if="avatar">
          <img :src="avatar">
        </v-avatar>
        <span>{{ fullname }}{{ }}</span>

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
          <div class="grey--text info-text">Birthdate: {{ birthdateFormattedUSA }}</div>
          <br>
          <div v-if="isUsingFeet" class="grey--text info-text">Height: {{ height }}</div>
          <div v-if="!isUsingFeet" class="grey--text info-text">Height: {{ heightInCm }}</div>
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
          <div class="grey--text info-text">Desired Weight: {{ desiredWeight }} {{ weightUnit }}</div>
        </v-flex>
        <v-flex xs1>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>

  <v-card v-if="editMode"   light text hover>
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
                  <input type="file" @change="onFileChange">

              <!-- <v-file-input v-model='files' @change="handleFileUpload" prepend-icon="mdi-camera" :rules="rulesAvatar" accept="image/png, image/jpeg, image/bmp" label="Avatar" placeholder="Pick new avatar to replace it"></v-file-input> -->
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
          <div v-if="isUsingFeet" class="grey--text info-text" style="margin-top: 16px;">Height:
            <div class="grey--text info-text">
              <v-layout row>
                <v-flex xs1>
                </v-flex>
                <v-flex xs4>
                  <v-select v-model="feet" @change="updateHeight()" :items="feetList" label="Feet"></v-select>
                </v-flex>
                <v-flex xs2>
                </v-flex>
                <v-flex xs4>
                  <v-select v-model="inches" @change="updateHeight()" :items="inchesList" label="Inches"></v-select>
                </v-flex>
                <v-flex xs1>
                </v-flex>
              </v-layout>
            </div>
          </div>
          <div v-if="!isUsingFeet" class="grey--text info-text" style="margin-top: 16px;">Height:
            <div class="grey--text info-text">
              <v-layout row>
                <v-flex xs1>
                </v-flex>
                <v-flex xs9>
                  <v-select v-model="centimeters" @change="updateHeight()" :items="metersList" label="Cm"></v-select>
                </v-flex>
                <v-flex xs2>
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
                        <v-radio label="Standard" @change="updNonSavedSelectedSystem('Standard')" value="Standard"></v-radio>
                        <v-radio label="Metric" @change="updNonSavedSelectedSystem('Metric')" value="Metric"></v-radio>
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
            <v-text-field :suffix="weightUnit" v-model="desiredWeight"></v-text-field>
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
import * as constants from '../constants';

import {
  mapActions,
  mapGetters
} from 'vuex';

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
      gender: ' - ',
      feet: 5,
      inches: 4,
      centimeters: 170,
      feetList: [4, 5, 6, 7],
      inchesList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      metersList: [...Array(221).keys()].slice(122),
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
    ...mapActions([
      'updateNonSavedSelectedSystem',
    ]),
    ...mapGetters([
      'weightUnit', 'heightUnit',
    ]),
    standAlone() {
      return this.$route.path != '/home';
    },
    getUser() {
      return this.$store.getters.getUser;
    },
    fullname() {
      return this.getUser.name + ' ' + this.getUser.last_name;
    },
    birthdateFormatted() {
      if(this.getUser.birthdate) {
        let FormattedDate = new Date(this.getUser.birthdate + 'T00:00:00').toISOString().substr(0, 10);
        return FormattedDate;
      } else {
        return '';
      }
    },
    birthdateFormattedUSA() {
      let FormattedDate = new Date(this.getUser.birthdate + 'T00:00:00').toLocaleDateString('en-US').substr(0, 10);
      return FormattedDate;
    }, 
    getSystem() {
       if(!this.getUser.gender) {
        return 'Standard';
      }
      return this.getUser.system.charAt(0).toUpperCase() + this.getUser.system.slice(1).toLowerCase();
    },
    isUsingLbs() {
      return this.weightUnit == "lbs";
    },
    isUsingFeet() {
      return this.heightUnit != "m";
    },
    height() {
      if(!this.feet || !this.inches) {
        return '';
      }
      return `${this.feet}' ${this.inches}"`;
    },
    heightInCm() {
      if(!this.centimeters) {
        return '';
      }
      return `${this.centimeters} cm`;
    }

  },
  methods: {
    updateUser() {
      let element = {};
      element.id = this.getUser.id;
      element.name = this.name;
      element.last_name = this.lastName;
      element.email = this.email;
      if (this.isUsingLbs) {
        element.desired_weight = +this.desiredWeight;
      } else {
        element.desired_weight = (+this.desiredWeight / constants.RATIO_LBS_TO_KG).toFixed(2);
      }

      if (this.isUsingFeet) {
        element.height_in_inches = this.convertToInches(this.feet, this.inches);
      } else {
        element.height_in_inches = this.convertToInchesFromCm(this.centimeters);
      }
      this.updateHeight();
      element.gender = this.gender;
      element.birthdate = this.birthdate;
      element.activity_level = +this.activityLevel;
      element.system = this.system;
      element.avatar = this.avatar;
      
      this.$store.dispatch('updateUser', element);
      this.editMode = false;

    },
    convertToInches(feet, inches) {
      return feet * constants.INCHES_IN_FEET + inches;
    },
    convertToInchesFromCm(cm) {
      return (cm / constants.RATIO_INCHES_CM).toFixed(2);
    },
    convertToCentimeters(feet, inches) {
      return Math.round(feet * constants.RATIO_FEET_CM + inches * constants.RATIO_INCHES_CM);
    },
    undoEditting() {
      this.editMode = false;
      this.updateDataFromStore();
      this.updNonSavedSelectedSystem(this.getSystem); 
    },  
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return; 
      this.createImage(files[0]); 
    },  
    createImage(file) { 
      var image = new Image();
      var reader = new FileReader();
      var vm = this; 

      reader.onload = (e) => {
        vm.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    updNonSavedSelectedSystem(val) {
      this.$store.dispatch('updateNonSavedSelectedSystem', {
        system: val
      });
      if (this.isUsingLbs) {
        this.desiredWeight = this.getUser.desired_weight;
      } else {
        this.desiredWeight = (this.getUser.desired_weight * constants.RATIO_LBS_TO_KG).toFixed(2);
      }

    },
    getHeight() {
      let feet = Math.floor(this.getUser.height_in_inches / constants.INCHES_IN_FEET);
      let inches = Math.floor(this.getUser.height_in_inches % constants.INCHES_IN_FEET);
      this.feet = feet;
      this.inches = inches;
      this.centimeters = this.convertToCentimeters(this.feet, this.inches);
    },
    updateHeight() {
      if (this.isUsingFeet) {
        this.centimeters = this.convertToCentimeters(this.feet, this.inches);
      } else {
        let total_inches = this.convertToInchesFromCm(this.centimeters)
        this.feet = Math.floor(total_inches / constants.INCHES_IN_FEET);
        this.inches = Math.floor(total_inches % constants.INCHES_IN_FEET);
      }
    },
    updateDataFromStore() {
      this.birthdate = this.birthdateFormatted;
      this.activityLevel = this.getUser.activity_level;
      this.gender = this.getUser.gender;
      this.name = this.getUser.name;
      this.lastName = this.getUser.last_name;
      this.email = this.getUser.email;
      this.system = this.getSystem;
      this.desiredWeight = this.getUser.desired_weight;
      this.avatar = this.getUser.avatar;
      this.getHeight();
    }
  },
  mounted: function () {
    this.updateDataFromStore();
    setTimeout(() => {
      this.updateDataFromStore();
    }, 900);
  },
 
}
</script>

<style lang="scss" scoped>
.info-text {
  line-height: 30px;
}

.main-personal {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;

  .v-card {
    min-width: 1000px;
    max-height: 700px; 
  }
}
.v-card {
  background-color: #eee;
}
</style>
