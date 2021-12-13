import React, {useEffect, useReducer} from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Col from '../layout/col/col';
import Row from '../layout/row/row';
import {API_SERVER_URL} from '../../constants';
import AppContext from '../../services/context/app';
import appReducer from '../../services/reducers/app';

const initialState = {
  ingredients: [],
  error: null
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer(initialState), initialState);

  useEffect(() => {
    const fetchData = () => fetch(`${API_SERVER_URL}/ingredients`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(`Статус ответа: ${response.status}. Сообщение: ${text}`);
        });
      })
      .then(({data}) => {
        dispatch({type: 'set-ingredients', payload: data});
      })
      .catch((err) => dispatch({type: 'set-error', payload: err.message}));

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      <AppHeader />
      <Main>
        {
          state.error
            ? <p className="text text_type_main-medium mt-10">Ошибка! {state.error}</p>
            : (
              <Row>
                <Col mod="6">
                  <BurgerIngredients />
                </Col>
                <Col mod="6">
                  <BurgerConstructor />
                </Col>
              </Row>
            )
        }
      </Main>
    </AppContext.Provider>
  );
};

export default App;
