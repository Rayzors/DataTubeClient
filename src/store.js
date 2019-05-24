import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/api'
import cloneDeep from 'lodash/cloneDeep'

Vue.use(Vuex);

const models = {
  stats: {
    maxVideoDuration: 0,
    minVideoDuration: 0,
    averageVideoDuration: 0
  }
}

export default new Vuex.Store({
  state: {
    selectedCountries: {},
    selectedRanges: {},
    selectedCategories: {},
    compare: false,
    stats1: cloneDeep(models.stats),
    stats2: cloneDeep(models.stats)
  },
  mutations: {
    setCountry(state, { index, value }) {
      state.selectedCountries[index] = value;
    },
    setRange(state, { index, value }) {
      state.selectedRanges[index] = value;
    },
    setCategory(state, { index, value }) {
      state.selectedCategories = {
        ...state.selectedCategories,
        [index]: value,
      };
    },
    toggleCompare(state) {
      state.compare = !state.compare;
    },
    updateSelectedCategory(state, { index, value }) {
      state.selectedCategories[`category${index}`] = value;
    },
    setMaxVideoDuration(state, { statsSide, value }) {
      state['stats' + statsSide].maxVideoDuration = value
    },
    setMinVideoDuration(state, { statsSide, value }) {
      state['stats' + statsSide].minVideoDuration = value
    },
    setAverageVideoDuration(state, { statsSide, value }) {
      state['stats' + statsSide].averageVideoDuration = value
    }
  },
  actions: {
    setSelect({ commit }, payload) {
      commit(payload.mutationName, payload);
    },
    toggleCompare({ commit }) {
      commit('toggleCompare');
    },
    updateSelectedCategory({ commit }, payload) {
      commit('updateSelectedCategory', payload);
    },
    async loadVideosDurations({ commit }) {
      const videosDurations = (await api.fetchVideosDurations('france', 'musique')).data
      let max = 0
      let min = videosDurations[0] ? videosDurations[0].duration : 0
      let total = 0
      videosDurations.forEach(videoDuration => {
        const duration = videoDuration.duration
        if (duration > max) { max = duration }
        if (duration < min) { min = duration }
        total += duration
      })
      const average = total / videosDurations.length
      commit('setMaxVideoDuration', { statsSide: 1, value: max })
      commit('setMinVideoDuration', { statsSide: 1, value: min })
      commit('setAverageVideoDuration', { statsSide: 1, value: average })
    }
  },
  getters: {
    getSelectedCategories: state => state.selectedCategories,
    getCompare: state => state.compare,
    getMaxVideoDuration: state => statsSide => state['stats' + statsSide].maxVideoDuration,
    getMinVideoDuration: state => statsSide => state['stats' + statsSide].minVideoDuration,
    getAverageVideoDuration: state => statsSide => state['stats' + statsSide].averageVideoDuration
  },
});
