import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCountries: {},
    selectedRanges: {},
    selectedCategories: {},
    compare: false,
  },
  mutations: {
    setCountry(state, {index, value}) {
      state.selectedCountries[index] = value
    },
    setRange(state, {index, value}) {
      state.selectedRanges[index] = value
    },
    setCategory(state, {index, value}) {
      state.selectedCategories[index] = value
    },
    toggleCompare(state) {
      state.compare = !state.compare
    },
    updateSelectedCategory(state, { index, value }) {
      state.selectedCategories[`category${index}`] = value;
    },
  },
  actions: {
    setSelect({ commit }, payload) {
      commit(payload.mutationName, payload)
    },
    toggleCompare({ commit }) {
      commit('toggleCompare')
    },
    updateSelectedCategory({ commit }, payload) {
      commit('updateSelectedCategory', payload)
    }
  },
  getters: {
    getSelectedCategories: state => state.selectedCategories
  }
});
