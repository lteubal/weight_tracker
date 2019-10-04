import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as constants from './constants';

Vue.use(Vuex);

const state = {
  current_bmi: 0,
  nonSavedSelectedSystem: 'Standard',
  weights: [],
  user: {
    id: 0,
    name: '',
    last_name: '',
    email: '',
    desired_weight: '',
    height_in_inches: '',
    gender: '',
    birthdate: '',
    activity_level: '',
    system: '',
    avatar: ''
  }
};

const mutations = {
  SET_WEIGHTS(state, weights) {
    state.weights = weights;
  },
  SET_USER(state, user) {
    state.user = user;
    state.nonSavedSelectedSystem = state.user.system;
  },
  ADD_WEIGHT(state, entry) {
    state.weights.unshift(entry);
  },
  DELETE_WEIGHT(state, id) {
    state.weights = state.weights.filter(weight => weight.id != id);
  },
  UPDATE_WEIGHT(state, payload) {
    state.weights.map(function(element) {
      if (element.id == payload.id) {
        element.weight = payload.weight;
      }
      return element;
    });
  },
  UPDATE_USER(state, user) {
    state.user = user;
  },
  UPDATE_NON_SAVED_SELECTED_SYSTEM(state, payload) {
    state.nonSavedSelectedSystem = payload.system;
  }
};

const actions = {
  addWeight(context, entry) {
    axios
      .post('/weights/', {
        date: entry.date,
        weight: entry.weight
      })
      .then(result => {
        context.commit("ADD_WEIGHT", entry);
      });

  },
  deleteWeight(context, id) {
    axios
      .delete('/weights/' + id)
      .then(result => {
        context.commit("DELETE_WEIGHT", id);
      });

  },
  updateWeight(context, element) {
    axios
      .put('/weights/' + element.id, {
        weight: element.weight
      })
      .then(result => {
        context.commit("UPDATE_WEIGHT", element);
      });
  },
  updateUser(context, user) {
    axios
      .put('/user/' + user.id, {
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        desired_weight: user.desired_weight,
        height_in_inches: user.height_in_inches,
        gender: user.gender,
        birthdate: user.birthdate,
        activity_level: user.activity_level,
        system: user.system,
        avatar: user.avatar
      })
      .then(result => {
        context.commit('SET_USER', user);
      });
  },
  updateNonSavedSelectedSystem(context, system) {
    context.commit("UPDATE_NON_SAVED_SELECTED_SYSTEM", system);
  },
  loadWeights(context) {
    axios
      .get('/weights')
      .then(r => r.data)
      .then(weights => {
        context.commit('SET_WEIGHTS', weights)
      });
  },
  loadUser(context) {
    axios
      .get('/user')
      .then(r => r.data)
      .then(user => {
        context.commit('SET_USER', user);
      });
  },

}

const getters = {
  getWeights(state) {
    let weights = Object.values(state.weights).sort((a, b) => {
      return new Date(b.date) - new Date(a.date) || new Date(b.created_at) - new Date(a.created_at)
    });
    weights.map(function(weight, idx, weights) {
      weight.color = 'grey--text';
      weight.colorBack = 'grey darken-2';
      weight.icon = 'drag_handle';

      if (idx < state.weights.length - 1 && +weights[idx].weight < +weights[idx + 1].weight) {
        weight.color = 'teal--text';
        weight.colorBack = 'teal darken-2';
        weight.icon = 'arrow_downward';
      }

      if (idx < state.weights.length - 1 && +weights[idx].weight > +weights[idx + 1].weight) {
        weight.color = 'purple--text';
        weight.colorBack = 'purple darken-2';
        weight.icon = 'arrow_upward';
      }
      return weight;
    });
    if (weights.length) {
      weights[weights.length - 1].icon = 'star';
    };

    return weights.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    });
  },
  hasWeights() {
    return Object.values(state.weights).length > 0;
  },
  getNextWeightId() {
    let weights = Object.values(state.weights);
    if (weights.length) {
      const maxId = weights.reduce(
        (max, weights) => (weights.id > max ? weights.id : max),
        weights[0].id
      );
      return maxId + 1;
    } else {
      return 1;
    }
  },
  getUser(state) {
    return state.user;
  },
  getCurrentWeightInLbs(state) {
    if (state.weights.length) {
      return state.weights[0].weight;
    } else {
      return 0;
    }
  },
  getCurrentWeightInKg(state) {
    if (state.weights.length) {
      return (state.weights[0].weight * constants.RATIO_LBS_TO_KG).toFixed(2);
    } else {
      return 0;
    }
  },
  getCurrentWeight(state, getters) {
    return state.nonSavedSelectedSystem == "Standard" ? getters.getCurrentWeightInLbs : getters.getCurrentWeightInKg;
  },
  getCurrentBMI(state, getters) {
    let bmi = 703 * getters.getCurrentWeightInLbs / (getters.getUser.height_in_inches * getters.getUser.height_in_inches);
    return bmi.toFixed(1);
  },
  getAge() {
    var today = new Date();
    var birthDate = new Date(state.user.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  },
  weightUnit(state) {
    return state.nonSavedSelectedSystem == 'Standard' ? "lbs" : "kg";
  },
  heightUnit(state) {
    return state.nonSavedSelectedSystem == 'Standard' ? "" : "m";
  },
  getCurrentBMILevel(state, getters) {
    let bmi = getters.getCurrentBMI;
    switch (true) {
      case bmi < 16:
        return "Severe Thinness";
        break;
      case bmi >= 16 && bmi < 17:
        return "Moderate Thinness";
        break;
      case bmi >= 17 && bmi < 18.5:
        return "Mild Thinness";
        break;
      case bmi >= 18.5 && bmi < 25:
        return "Normal";
        break;
      case bmi >= 25 && bmi < 30:
        return "Overweight";
        break;
      case bmi >= 30 && bmi < 35:
        return "Obese Class I";
        break;
      case bmi >= 35 && bmi < 40:
        return "Obese Class II	";
        break;
      case bmi >= 40:
        return "Obese Class III	";
        break;
      default:
        return "";
        break;
    }
  },
  getCurrentBMILevelColor(state, getters) {
    let bmi = getters.getCurrentBMI;
    switch (true) {
      case bmi < 16:
        return "blue--text";
        break;
      case bmi >= 16 && bmi < 17:
        return "blue--text";
        break;
      case bmi >= 17 && bmi < 18.5:
        return "blue--text";
        break;
      case bmi >= 18.5 && bmi < 25:
        return "green--text";
        break;
      case bmi >= 25 && bmi < 30:
        return "red--text";
        break;
      case bmi >= 30 && bmi < 35:
        return "red--text";
        break;
      case bmi >= 35 && bmi < 40:
        return "red--text";
        break;
      case bmi >= 40:
        return "red--text";
        break;
      default:
        return "";
        break;
    }
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});