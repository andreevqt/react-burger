import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Col from '../layout/col/col';
import Row from '../layout/row/row';
import { getItems } from '../../services/actions/ingredients';

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.ingredients.error || store.order.error);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Main>
        {error ? (
          <p className="text text_type_main-medium mt-10">
            Ошибка!
            {error}
          </p>
        ) : (
          <Row>
            <Col mod="6">
              <BurgerIngredients />
            </Col>
            <Col mod="6">
              <BurgerConstructor />
            </Col>
          </Row>
        )}
      </Main>
    </>
  );
};

export default App;
