import { generateDBURL } from '../../../utils/http';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(generateDBURL(`/coaches/${userId}`), {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to register!');
      throw error;
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) return;

    const response = await fetch(generateDBURL(`/coaches`));
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];
    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        areas: data[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
