export const generateDBURL = (path) => {
  return process.env.VUE_APP_DB_URL + path + '.json';
};
