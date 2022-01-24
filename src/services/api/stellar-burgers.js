const fetchBase = (url, { method, headers = {}, data }) => (
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...(data && { body: JSON.stringify(data) })
  })
    .then((response) => (
      response.ok
        ? response
          .json()
        : response
          .text()
          .then((text) => {
            const err = new Error(`Status: ${response.status}. Message: ${text}`);
            try {
              err.response = JSON.parse(text);
            } catch (e) {
              err.response = text;
            }
            throw err;
          })
    ))
);

const get = (url, headers) => fetchBase(url, {
  method: 'GET',
  headers
});

const post = (url, data, headers) => fetchBase(url, {
  method: 'POST',
  headers,
  data,
});

const patch = (url, data, headers) => fetchBase(url, {
  method: 'PATCH',
  headers,
  data,
});

const api = (baseUrl) => ({
  ingredients: {
    list: () => get(`${baseUrl}/ingredients`)
      .then((result) => result.data),
  },
  order: {
    create: (ingredients, token) => post(`${baseUrl}/orders`, { ingredients }, { Authorization: token })
      .then(({ name, order }) => ({ name, order })),
  },
  auth: {
    register: (email, password, name) => post(`${baseUrl}/auth/register`, { email, password, name }),
    login: (email, password) => post(`${baseUrl}/auth/login`, { email, password }),
    logout: (token) => post(`${baseUrl}/auth/logout`, { token }),
    get: (token) => get(`${baseUrl}/auth/user`, { Authorization: token }),
    update: (token, data) => patch(`${baseUrl}/auth/user`, data, { Authorization: token }),
    refresh: (token) => post(`${baseUrl}/auth/token`, { token }),
  },
  password: {
    getCode: (email) => post(`${baseUrl}/password-reset`, { email }),
    reset: (password, token) => post(`${baseUrl}/password-reset/reset`, { password, token })
  }
});

export default api;
