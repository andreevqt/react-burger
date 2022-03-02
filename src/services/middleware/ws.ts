import { Middleware } from 'redux';

const ws = (wsUrl: string, prefix: string, needsAuth: boolean = false): Middleware => {
  return ({ getState, dispatch }) => {
    let socket: WebSocket | undefined = undefined;
    return (next) => (action) => {
      const { type, payload } = action;
      let token = getState().auth.accessToken;
      if (token) {
        token = token.replace('Bearer ', '');
      }

      let url = wsUrl;
      if (needsAuth && token) {
        url += `?token=${token}`;
      }

      if (type === `${prefix}_WS_INIT`) {
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: `${prefix}_WS_SUCCESS` });
        };

        socket.onerror = () => {
          dispatch({ type: `${prefix}_WS_ERROR` });
        };

        socket.onmessage = (e) => {
          const { data } = e;
          const parsedData = JSON.parse(data);
          const { success, ...rest } = parsedData;
          dispatch({ type: `${prefix}_WS_MESSAGE`, payload: rest });
        };

        socket.onclose = () => {
          dispatch({ type: `${prefix}_WS_CLOSED` });
        };

        if (type === `${prefix}_WS_SEND`) {
          socket.send(JSON.stringify({ ...payload, token }));
        }

        if (type === `${prefix}_WS_CLOSE`) {
          socket.close();
        }
      }
      next(action);
    };
  };
};

export default ws;
