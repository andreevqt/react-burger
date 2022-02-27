import requests, { HttpError } from './requests';



export type TResponse = {
  success: boolean;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
};

export type TIngredientType = 'bun' | 'main' | 'sauce';

export type TIngredient = {
  _id: string;
  id?: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count: number;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TUserResponse = TResponse & {
  user: TUser;
};

export type TUpdateResponse = TUserResponse;

export type TLoginResponse = TUserResponse & TTokens;

export type TRegisterResponse = TLoginResponse;

export type TResetResponse = TResponse & TTokens;

export type TLogoutResponse = TResponse & {
  message: string;
};

export type TIngredientsResponse = TResponse & {
  data: TIngredient[];
};

export type TOrder = {
  number: number;
};

export type TOrderResponse = TResponse & {
  order: TOrder;
  name: string;
};

export type TError = string | object;

export type TUpdateProps = {
  name?: string;
  password?: string;
  email?: string;
};

const api = {
  ingredients: {
    list: () => requests.public.get<TIngredientsResponse>(`/ingredients`)
      .then((result) => result.data),
  },
  order: {
    create: (ingredients: string[]) => requests.private.post(`/orders`, { ingredients })
      .then(({ name, order }) => ({ name, order })),
  },
  auth: {
    register: (email: string, password: string, name: string) => requests.public.post<TRegisterResponse>(`/auth/register`, { email, password, name }),
    login: (email: string, password: string) => requests.public.post<TLoginResponse>(`/auth/login`, { email, password }),
    logout: (token: string) => requests.public.post<TLogoutResponse>(`/auth/logout`, { token }),
    get: () => requests.private.get<TUserResponse>(`/auth/user`),
    update: (data: TUpdateProps) => requests.private.patch<TUpdateResponse>(`/auth/user`, data),
    refresh: (token: string) => requests.public.post<TResetResponse>(`/auth/token`, { token }),
  },
  password: {
    getCode: (email: string) => requests.public.post(`/password-reset`, { email }),
    reset: (password: string, token: string) => requests.public.post(`/password-reset/reset`, { password, token })
  }
};

export {
  HttpError
};

export default api;
