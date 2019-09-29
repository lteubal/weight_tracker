import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  current_bmi: 0,
  weights: [{
      id: 10,
      userId: 1,
      date: "2019-03-21",
      weight: "168.20"
    },
    {
      id: 9,
      userId: 1,
      date: "2019-03-20",
      weight: "157.20"
    },
    {
      id: 8,
      userId: 1,
      date: "2019-03-20",
      weight: "167.20"
    },
    {
      id: 7,
      userId: 1,
      date: "2019-03-20",
      weight: "187.20"
    },
    {
      id: 6,
      userId: 1,
      date: "2019-03-20",
      weight: "187.20"
    },
    {
      id: 5,
      userId: 1,
      date: "2019-03-20",
      weight: "187.20"
    },
    {
      id: 4,
      userId: 1,
      date: "2019-01-01",
      weight: "178.80"
    },
    {
      id: 3,
      userId: 1,
      date: "2018-11-20",
      weight: "177.10"
    },
    {
      id: 2,
      userId: 1,
      date: "2018-11-03",
      weight: "178.50"
    },
    {
      id: 1,
      userId: 1,
      date: "2018-10-01",
      weight: "180.20"
    },
  ],
  user: {
    id: 1,
    name: 'Joe',
    lastname: 'Smith',
    email: 'jsmith@gmail.com',
    desired_weight: '160',
    height_in_inches: '74.5',
    gender: 'male',
    birthdate: '1930-01-01',
    activity_level: '83',
    weight_unit: 'pounds',
    height_unit: 'feet',
    energy_unit: 'calories',
    avatar: '/images/avatar.png'
  }
};

const mutations = {
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
  }
};

const actions = {
  addWeight(context, entry) {
    context.commit("ADD_WEIGHT", entry);
  },
  deleteWeight(context, id) {
    context.commit("DELETE_WEIGHT", id);
  },
  updateWeight(context, element) {
    context.commit("UPDATE_WEIGHT", element);
  }
};

const getters = {
  getWeights(state) {
    let weights = Object.values(state.weights).sort();
    weights.map(function(weight, idx, weights) {
      weight.color = 'grey--text';
      weight.colorBack = 'grey darken-2';
      weight.icon = 'drag_handle';

      if (idx < state.weights.length - 1 && weights[idx].weight < weights[idx + 1].weight) {
        weight.color = 'green--text';
        weight.colorBack = 'green darken-2';
        weight.icon = 'arrow_downward';
      }

      if (idx < state.weights.length - 1 && weights[idx].weight > weights[idx + 1].weight) {
        weight.color = 'red--text';
        weight.colorBack = 'red darken-2';
        weight.icon = 'arrow_upward';
      }
      return weight;
    });
    weights[weights.length - 1].icon = 'star';
    return weights.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    });
  },
  hasWeights() {
    return Object.values(state.weights).length > 0;
  },
  getNextWeightId() {
    let weights = Object.values(state.weights);
    const maxId = weights.reduce(
      (max, weights) => (weights.id > max ? weights.id : max),
      weights[0].id
    );
    return maxId + 1;
  },
  getUser(state) {
    return state.user;
  },
  getCurrentWeight(state) {
    return state.weights[0].weight;
  },
  getCurrentBMI(state, getters) {
    let bmi = 703 * getters.getCurrentWeight / (getters.getUser.height_in_inches * getters.getUser.height_in_inches);
    return bmi.toFixed(1);
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