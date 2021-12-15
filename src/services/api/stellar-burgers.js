const fetchBase = (url, options) => (
  fetch(url, options)
    .then((response) => (
      response
        .json()
        .then((result) => {
          if (!result.success) {
            throw new Error(`Status: ${result.status}. Message: ${result.message}`);
          }
          return result;
        })
        .catch((err) => {
          throw new Error(`Status: ${response.status}. Message: ${err.message}`);
        })
    ))
);

const get = (url) => fetchBase(url);

const post = (url, data) => fetchBase(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const api = (baseUrl) => ({
  ingredients: {
    list: () => get(`${baseUrl}/ingredients`)
      .then((result) => result.data),
  },
  order: {
    create: (ingredients) => post(`${baseUrl}/orders`, { ingredients })
      .then(({ name, order }) => ({ name, order })),
  },
});

export default api;
