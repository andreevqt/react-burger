import React, {useState} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientCard from '../ingredient-card/ingredient-card';
import CustomScroll from '../custom-scroll/custom-scroll';
import {dataProptypes} from '../../utils/data';

const Grid = ({
  gap = 'calc(var(--offset-base-size) * 10) calc(var(--offset-base-size) * 6)',
  columns = '1fr 1fr',
  children
}) => {
  const styles = {
    gap,
    gridTemplateColumns: columns
  };

  return (
    <CustomScroll className="pr-4 pl-4 pt-6">
      <div className={`${burgerIngredientsStyles['grid']}`} style={styles}>
        {children}
      </div>
    </CustomScroll>
  );
};

Grid.propTypes = {
  gap: PropTypes.string,
  columns: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
}

const BurgerIngredients = ({
  items
}) => {
  const tabs = [
    {label: `Булки`, value: 'bun'},
    {label: `Соусы`, value: 'sauce'},
    {label: `Начинки`, value: 'main'},
  ]

  const [current, setCurrent] = useState('bun');
  const {label} = tabs.find(tab => tab.value === current);

  return (
    <>
      <h2 className="text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <Tabs current={current} onClick={setCurrent} tabs={tabs}>
        <h5 className={`${burgerIngredientsStyles['tabs-label']} text_type_main-medium mt-10`}>{label}</h5>
        <Grid>
          {
            items.map((item, idx) => item.type === current ? (
              <IngredientCard
                key={idx}
                {...item}
              />
            ) : null)
          }
        </Grid>
      </Tabs>
    </>
  )
};

BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(dataProptypes)
};

export default BurgerIngredients;
