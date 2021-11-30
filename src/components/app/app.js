import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger.constructor';
import {Col, Row} from '../layout/layout';
import {data} from '../../utils/data'

const App = () => {
  const [items, setItems] = useState([]);
  const [ordered, setOrdered] = useState([]);

  useEffect(() => {
    const ordered = [
      data[0],
      data[1],
      data[2],
      data[3],
      data[6],
      data[5],
      data[4],
    ];

    const orderedMap = ordered.reduce((acc, item) => {
      acc[item._id] = {...item, count: 1};
      return acc;
    }, {});
    const items = data.map((item) => (orderedMap[item._id] || item));
    
    setItems(items);
    setOrdered(ordered);
  }, []);

  return (
    <>
      <AppHeader />
      <Main>
        <Row>
          <Col mod="6">
            <BurgerIngredients items={items} />
          </Col>
          <Col mod="6">
            <BurgerConstructor items={ordered} />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default App;
