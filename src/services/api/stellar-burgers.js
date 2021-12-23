const fetchBase = (url, options) => (
  fetch(url, options)
    .then((response) => (
      response.ok
        ? response
          .json()
        : response
          .text()
          .then((text) => {
            throw new Error(`Status: ${response.status}. Message: ${text}`);
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
