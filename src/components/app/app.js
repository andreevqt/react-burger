import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Col from '../layout/col/col';
import Row from '../layout/row/row';
import {API_SERVER_URL} from '../../constants';

const App = () => {
  const [items, setItems] = useState([]);
  const [ordered, setOrdered] = useState([]);
  const [error, setError] = useState(null);

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
        const ordered = [
          data[0],
          data[1],
          data[2],
          data[3],
          data[6],
          data[5],
          data[4],
        ];
        setOrdered(ordered);

        const orderedMap = ordered.reduce((acc, item) => {
          acc[item._id] = {...item, count: 1};
          return acc;
        }, {});

        const items = data.map((item) => (orderedMap[item._id] || item));
        setItems(items);
      })
      .catch((err) => setError(err.message));

    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <Main>
        {
          error
            ? <p className="text text_type_main-medium mt-10">Ошибка! {error}</p>
            : (
              <Row>
                <Col mod="6">
                  <BurgerIngredients items={items} />
                </Col>
                <Col mod="6">
                  <BurgerConstructor items={ordered} />
                </Col>
              </Row>
            )
        }
      </Main>
    </>
  );
};

export default App;
