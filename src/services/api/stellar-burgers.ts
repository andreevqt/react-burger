export type THttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type THttpHeaders = { [name: string]: string };

export class HttpError extends Error {
  response: any;
};

const fetchBase = (url: string, { method, headers = {}, data }: { method: THttpMethods, headers?: THttpHeaders, data?: any }) => (
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
            const err = new HttpError(`Status: ${response.status}. Message: ${text}`);
            try {
              err.response = JSON.parse(text);
            } catch (e) {
              err.response = text;
            }
            throw err;
          })
    ))
);

const get = (url: string, headers?: THttpHeaders) => fetchBase(url, {
  method: 'GET',
  headers
});

const post = (url: string, data?: any, headers?: THttpHeaders) => fetchBase(url, {
  method: 'POST',
  headers,
  data,
});

const patch = (url: string, data?: any, headers?: THttpHeaders) => fetchBase(url, {
  method: 'PATCH',
  headers,
  data,
});

export type TUpdateProps = {
  name?: string;
  password?: string;
  email?: string;
};

const api = (baseUrl: string) => ({
  ingredients: {
    list: () => get(`${baseUrl}/ingredients`)
      .then((result) => result.data),
  },
  order: {
    create: (ingredients: Array<number>, token: string) => post(`${baseUrl}/orders`, { ingredients }, { Authorization: token })
      .then(({ name, order }) => ({ name, order })),
  },
  auth: {
    register: (email: string, password: string, name: string) => post(`${baseUrl}/auth/register`, { email, password, name }),
    login: (email: string, password: string) => post(`${baseUrl}/auth/login`, { email, password }),
    logout: (token: string) => post(`${baseUrl}/auth/logout`, { token }),
    get: (token: string) => get(`${baseUrl}/auth/user`, { Authorization: token }),
    update: (token: string, data: TUpdateProps) => patch(`${baseUrl}/auth/user`, data, { Authorization: token }),
    refresh: (token: string) => post(`${baseUrl}/auth/token`, { token }),
  },
  password: {
    getCode: (email: string) => post(`${baseUrl}/password-reset`, { email }),
    reset: (password: string, token: string) => post(`${baseUrl}/password-reset/reset`, { password, token })
  }
});

export default api;
