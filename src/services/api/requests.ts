import { API_SERVER_URL } from '../../constants';
import { setAuthData } from '../actions/auth';
import decode from '../../utils/parse-jwt';
import store from '../store';

export class HttpError extends Error {
  response: any;
};

export type THttpHeaders = {
  [name: string]: string;
};

export type TFetchOptions = {
  headers?: THttpHeaders;
  onRequest?: (headers: THttpHeaders) => Promise<void>;
};

export type THttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE';

const defaultOptions: TFetchOptions = {
};

const defaultHeaders: THttpHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

type TRequestParams = {
  url: string;
  method: THttpMethod;
  data?: Object;
  options: TFetchOptions;
};

const request = async <T = any>({ url, method, data, options }: TRequestParams) => {
  const headers = { ...defaultHeaders, ...options.headers };

  if (options.onRequest) {
    await options.onRequest(headers);
  }

  return fetch(url, {
    method,
    headers: headers,
    ...(method !== 'GET' && data && { body: JSON.stringify(data) }
    )
  }).then((response) =>
    response.ok
      ? response.json() as Promise<T>
      : response.text()
        .then((text) => {
          const err = new HttpError(`Status: ${response.status}. Message: ${text}`)
          try {
            err.response = JSON.parse(text);
          } catch (e) {
            err.response = text;
          }
          return Promise.reject(err);
        })
  );
};

const createRequest = (baseUrl: string, options: Partial<TFetchOptions> = {}) => {
  const defaults = { ...defaultOptions, ...options };
  return {
    get: <T = any>(url: string, options: TFetchOptions = {}) => request<T>({ url: `${baseUrl}${url}`, method: 'GET', options: { ...defaults, ...options } }),
    post: <T = any>(url: string, data: any, options: TFetchOptions = {}) => request<T>({ url: `${baseUrl}${url}`, method: 'POST', data, options: { ...defaults, ...options } }),
    put: <T = any>(url: string, data: any, options: TFetchOptions = {}) => request<T>({ url: `${baseUrl}${url}`, method: 'PUT', data, options: { ...defaults, ...options } }),
    patch: <T = any>(url: string, data: any, options: TFetchOptions = {}) => request<T>({ url: `${baseUrl}${url}`, method: 'PATCH', data, options: { ...defaults, ...options } }),
    delete: <T = any>(url: string, data: any, options: TFetchOptions = {}) => request<T>({ url: `${baseUrl}${url}`, method: 'DELETE', data, options: { ...defaults, ...options } })
  };
};

const isExpired = (token: string) => {
  const splited = token.split(' ')[1];
  const { exp } = decode(splited);
  const current = Date.now() / 1000;
  return current > exp;
};

const requests = {
  public: createRequest(API_SERVER_URL),
  private: createRequest(
    API_SERVER_URL,
    {
      onRequest: async (headers) => {
        const accessToken = store?.getState()?.auth.accessToken;
        if (accessToken && !isExpired(accessToken)) {
          headers['authorization'] = accessToken;
          return;
        }

        const token = localStorage.getItem('refreshToken');
        if (!token) {
          throw new Error('Refresh token is missing');
        }

        const result = await requests.public.post('/auth/token', { token });
        localStorage.setItem('refreshToken', result.refreshToken);

        const { auth } = store.getState()
        store.dispatch(setAuthData({ ...auth, accessToken: result.accessToken }));

        headers['authorization'] = result.accessToken;
      }
    }
  )
};

export default requests;
