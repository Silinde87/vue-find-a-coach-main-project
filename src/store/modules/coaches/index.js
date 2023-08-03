import mutations from './mutations';
import actions from './actions';
import getters from './getters';

import { coaches } from '../../../data/coaches.json';

export default {
  state() {
    return {
      lastFetch: null,
      coaches,
    };
  },
  mutations,
  actions,
  getters,
  namespaced: true,
};
