export const generateDBURL = (path, queries = '') => {
  const _queries = queries.length > 0 ? '?' + queries : '';
  return process.env.VUE_APP_DB_URL + path + '.json' + _queries;
};

export const generateAPIRESTURL = (action) => {
  return (
    process.env.VUE_APP_API_REST_URL +
    action +
    '?key=' +
    process.env.VUE_APP_FIREBASE_WEB_API_KEY
  );
};
