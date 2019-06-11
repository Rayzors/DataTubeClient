import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/api'
import cloneDeep from 'lodash/cloneDeep'
import RegionService from '@/services/region.service';
import CategoryService from '@/services/category.service';
import RessourceService from '@/services/ressouce.service';

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
    stats1: cloneDeep(models.stats),
    stats2: cloneDeep(models.stats)
    isLoading: true,
    categories: [],
    countries: [],
    column1: {
      selected: {
        country: '',
        range: '',
        category: '',
      },
      subscribersRanges: [
        {
          label: '0 - 10 000',
          nbChannelInRange: '1',
          value: '0-10000',
        },
        {
          label: '10 000 - 100 000',
          nbChannelInRange: '11',
          value: '10000-100000',
        },
        {
          label: '100 000 - 500 000',
          nbChannelInRange: '22',
          value: '100000-500000',
        },
        {
          label: '500 000 - 1 000 000',
          nbChannelInRange: '12',
          value: '500000-1000000',
        },
        {
          label: '1 000 000 - 10 000 000',
          nbChannelInRange: '11',
          value: '1000000-10000000',
        },
      ],
      datas: [],
    },
    column2: {
      selected: {
        country: '',
        range: '',
        category: '',
      },
      subscribersRanges: [
        {
          label: '0 - 10 000',
          nbChannelInRange: '1',
          value: '0-10000',
        },
        {
          label: '10 000 - 100 000',
          nbChannelInRange: '11',
          value: '10000-100000',
        },
        {
          label: '100 000 - 500 000',
          nbChannelInRange: '22',
          value: '100000-500000',
        },
        {
          label: '500 000 - 1 000 000',
          nbChannelInRange: '12',
          value: '500000-1000000',
        },
        {
          label: '1 000 000 - 10 000 000',
          nbChannelInRange: '11',
          value: '1000000-10000000',
        },
      ],
      datas: [],
    },
    compare: true,
  },
  mutations: {
    setSubscribersRanges(state, { column, datas }) {
      state[`column${column}`].subscribersRanges = datas;
    },
    setData(state, { column, datas }) {
      state[`column${column}`].datas = datas;
    },
    setSearchParams(state, { column, index, value }) {
      state[`column${column}`].selected[index] = value;
    },
    toggleCompare(state) {
      state.compare = !state.compare;
    },
    setCountryList(state, countries) {
      state.countries = [...countries];
    },
    setCategoryList(state, categories) {
      state.categories = [...categories];
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
    async setSelect({ commit, state }, payload) {
      commit('setSearchParams', payload);
      let datas = [];
      const {
        selected: { country, category, range },
      } = state[`column${payload.column}`];

      if (country && category && range) {
        state.isLoading = true;
        datas = await RessourceService.getRessouces(country, category, range);
      }
      const { subscriberRanges } = datas;
      commit('setSubscribersRanges', {
        column: payload.column,
        datas: subscriberRanges,
      });
      commit('setData', {
        column: payload.column,
        datas,
      });
      state.isLoading = false;
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
    async setList({ commit }, payload) {
      if (payload === 'categories') {
        commit('setCategoryList', await CategoryService.getAllCategories());
      } else if (payload === 'countries') {
        commit('setCountryList', await RegionService.getAllRegions());
      }
    },
  },
  getters: {
    getColumn1Selection: state => state.column1.selected,
    getColumn2Selection: state => state.column2.selected,
    getSubscribersRanges: state => [
      state.column1.subscribersRanges,
      state.column2.subscribersRanges,
    ],
    getColumn1Datas: state => state.column1.datas,
    getColumn2Datas: state => state.column2.datas,
    getCountries: state => state.countries,
    getCategories: state => state.categories,
    getCompare: state => state.compare,
    getMaxVideoDuration: state => statsSide => state['stats' + statsSide].maxVideoDuration,
    getMinVideoDuration: state => statsSide => state['stats' + statsSide].minVideoDuration,
    getAverageVideoDuration: state => statsSide => state['stats' + statsSide].averageVideoDuration
  },
});
