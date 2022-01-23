import React, { useMemo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import NoMatch from '../no-match/no-match';
import Col from '../../components/grid/col/col';
import Row from '../../components/grid/row/row';
import Base from '../../components/layout/base/base';
import useIngredients from '../../hooks/use-ingredients';
import IngredientSkeleton from './ingredient-skeleton/ingredient-skeleton';

const Ingredient = () => {
  const { ingredients, isLoading } = useIngredients();
  const { id } = useParams();

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  });

  const ingredient = useMemo(
    () => ingredients.find((item) => item._id === id),
    [id, ingredients]
  );

  const notFound = !isLoading && !ingredient && !firstRender.current;
  if (notFound) {
    return <NoMatch />;
  }

  return (
    <Base>
      <Row>
        <Col mod="6" align="center" className="d-flex flex-column align-items-center pt-30">
          {
            ingredient
              ? <IngredientDetails ingredient={ingredient} />
              : <IngredientSkeleton />
          }
        </Col>
      </Row>
    </Base>
  );
};

export default Ingredient;
