import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// Not making this as module namespaced, allows userId to be available on root store
export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  mutations,
  actions,
  getters,
};
