import { generateDBURL } from '../../../utils/http';

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      generateDBURL(`/requests/${payload.coachId}`),
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to send request.');
      throw error;
    }

    newRequest.id = data.name; // Automatically generated id from Firebase
    newRequest.coachId = payload.coachId;
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    const response = await fetch(generateDBURL(`/requests/${coachId}`));
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to fetch request.');
      throw error;
    }

    const requests = [];

    for (const key in data) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: data[key].userEmail,
        message: data[key].message,
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
