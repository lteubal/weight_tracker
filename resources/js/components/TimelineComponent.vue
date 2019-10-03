<template>
<div>
  <!-- Create Weight modal  -->
  <v-row justify="center">
    <v-dialog v-model="createWeightDialog" persistent max-width="600">
      <v-card>
        <v-card-title>
          <span class="headline">Add Weight</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="newWeightValueToCreate" :rules="rules" prepend-icon="get_app" class="title font-weight-bold" :suffix="weightUnit" label="Weight" @keypress="allowOnlyNumbers"></v-text-field>

                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="newDateToCreate" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="newDateToCreate" label="Entry Date" class="title font-weight-bold" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="newDateToCreate" scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(newDateToCreate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="grey lighten-1" text @click="createWeightDialog = false">Close</v-btn>
          <v-btn v-if="+newWeightValueToCreate>0 && +newWeightValueToCreate<=999" color="green darken-1" class="font-weight-bold" text @click="createWeightDialog = false; createWeight()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <!-- delete confirmation modal  -->
  <v-row justify="center">
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this entry?</v-card-title>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="deleteDialog = false; deleteWeight()">Yes</v-btn>
          <v-btn color="green darken-1" text @click="deleteDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <!-- deleted successfully message -->
  <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
    {{ deletedMessage }}
    <v-btn color="blue" text @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>

  <!-- created successfully message -->
  <v-snackbar v-model="snackbarCreated" :timeout="timeout" :top="true">
    {{ createdMessage }}
    <v-btn color="blue" text @click="snackbarCreated = false">
      Close
    </v-btn>
  </v-snackbar>
  <div v-bind:class="{'main-timeline': standAlone}">
    <v-card color="grey lighten-5" light text hover class="main-card">
      <v-card-text primary-title>
        <v-row>
          <v-col sm="3" md="3">
            <v-select :items="entriesPerPageList" v-model="weightsPerPage" label="Entries per page"></v-select>
          </v-col>
          <v-col sm="9" md="9" class="mt-4">
            <v-btn text color="success" @click="createWeightDialog = true">+ Add new weight</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-timeline v-if="hasWeights" right clipped light class="aligned-left">
          <v-timeline-item v-for="element in getWeightsPaginated" :icon="element.icon" :key="element.id" right class="mb-4" :color="element.colorBack" small>
            <v-row justify="space-between">
              <v-col cols="8">
                <v-text-field v-if="isEditing(element.id)" v-model="elementValue" :rules="rules" :color="element.colorBack" :suffix="weightUnit" class="headline font-weight-bold" hint="Weight" @keypress="allowOnlyNumbers" :value="convertToWeightUnit(element.weight)"></v-text-field>
                <span v-else :class="element.color" class="headline font-weight-bold text--darken-4">{{ convertToWeightUnit(element.weight)}}</span>
                <span v-if="isNotEditing(element.id)" class="title darkgray--text">{{ weightUnit }}</span>
              </v-col>
              <v-col v-if="isEditing(element.id)" class="text-right" cols="2">
                <v-btn x-small text>
                  <v-btn x-small icon color="black">
                    <v-icon @click="updateWeight()" small left class="mx-1" title="Save">save</v-icon>
                  </v-btn>
                </v-btn>
              </v-col>
              <v-col v-if="isEditing(element.id)" class="text-right" cols="2">
                <v-btn x-small icon color="black">
                  <v-icon small left class="mx-1" @click="undoWeight()" title="Undo">undo</v-icon>
                </v-btn>
              </v-col>
              <v-col v-if="isNotEditing(element.id)" class="text-right" cols="2">
                <v-btn x-small text>
                  <v-btn x-small icon color="black">
                    <v-icon @click="editWeight(element.id, convertToWeightUnit(element.weight))" small left class="mx-1" title="Edit">edit</v-icon>
                  </v-btn>
                </v-btn>
              </v-col>
              <v-col v-if="isNotEditing(element.id)" class="text-right" cols="2">
                <v-btn x-small icon color="red">
                  <v-icon @click="deleteDialog = true; deleteWeightId = element.id;" small left class="mx-1" title="Delete">remove_circle</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <template v-slot:opposite>
              <span class="subheading font-weight-bold text--lighten-1" :class="element.color">{{ getMonth(element.date) }} {{ getDay(element.date) }} </span>
              <div class="subheading font-weight-bold darkgray--text">{{ getYear(element.date) }}</div>
            </template>
          </v-timeline-item>
        </v-timeline>
        <div class="text-center">
          <v-pagination v-model="page" :length="getTotalPages" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
        </div>
      </v-card-text>
    </v-card>
  </div>
</div>
</template>

<script>
import * as constants from '../constants';

import {
  mapGetters
} from 'vuex';

export default {
  name: "TimelineComponent",
  data: () => ({
    page: 1,
    weightsPerPage: 10,
    totalPages: 1,
    entriesPerPageList: [2, 5, 10, 15, 20, 50, 100],
    menu: '',
    newWeightValueToCreate: 0,
    newDateToCreate: new Date().toISOString().substr(0, 10),
    snackbar: false,
    snackbarCreated: false,
    deletedMessage: 'The entry was deleted.',
    createdMessage: 'The entry was added.',
    timeout: 2000,
    deleteDialog: false,
    createWeightDialog: false,
    editWeightId: -1,
    deleteWeightId: -1,
    elementValue: 0,
    rules: [
      value => !!value || 'Required.',
      value => value <= 999 || 'Max 999 '
    ],
  }),
  computed: {
    ...mapGetters([
      'getWeights', 'hasWeights', 'getNextWeightId', 'weightUnit', 'heightUnit',
    ]),
    standAlone() {
      return this.$route.path != '/home';
    },
    getUser() {
      return this.$store.getters.getUser;
    },
    getTotalPages() {
      const weights = this.getWeights;
      const totalWeights = weights.length;
      const totalPages = Math.ceil(totalWeights / this.weightsPerPage);
      this.totalPages = totalPages;
      return totalPages;
    },
    getWeightsPaginated() {
      const weights = this.getWeights.slice((this.page - 1) * this.weightsPerPage, this.page * this.weightsPerPage);
      return weights;
    }
  },
  methods: {
    createWeight() {
      let element = {};
      element.weight = +this.newWeightValueToCreate;
      element.date = this.newDateToCreate;
      element.userId = this.getUser.id;
      element.id = this.getNextWeightId;
      if (this.weightUnit != "lbs") {
        element.weight = element.weight / constants.RATIO_LBS_TO_KG;
      }
      element.weight = element.weight.toFixed(2);
      this.$store.dispatch('addWeight', element);
      this.newWeightValueToCreate = 0;
      this.newDateToCreate = new Date().toISOString().substr(0, 10);
      this.snackbarCreated = true;
    },
    editWeight(id, weight) {
      this.elementValue = weight;
      this.editWeightId = id;
    },
    updateWeight() {
      let element = {};
      element.id = this.editWeightId;
      element.weight = +this.elementValue;
      if (this.weightUnit != "lbs") {
        element.weight = element.weight / constants.RATIO_LBS_TO_KG;
      }
      element.weight = element.weight.toFixed(2)
      this.$store.dispatch('updateWeight', element);
      this.editWeight(-1);
    },
    deleteWeight() {
      this.$store.dispatch('deleteWeight', this.deleteWeightId);
      this.editWeight(-1);
      this.snackbar = true;
    },
    undoWeight() {
      this.editWeightId = -1;
    },
    isEditing(id) {
      return this.editWeightId == id;
    },
    isNotEditing(id) {
      return !this.isEditing(id);
    },
    convertToWeightUnit(val) {
      if (this.weightUnit == "lbs") {
        return val;
      } else {
        return (val * constants.RATIO_LBS_TO_KG).toFixed(2);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.aligned-left {
  position: relative;
  left: -60px;
}

.main-timeline {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  text-align: center;

  .main-card {
    min-width: 1000px;
  }
}

.darkgray--text {
  color: #BDBDBD;
}

.v-card__text {
  background: #eee;
}
</style>
