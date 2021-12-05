import React, {useState, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientCard from '../ingredient-card/ingredient-card';
import CustomScroll from '../custom-scroll/custom-scroll';
import {dataProptypes} from '../../utils/data';
import IngredientDetails from '../ingredient-details/ingredient-details';
import throttle from '../../utils/throttle';

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
    <div
      className={`${burgerIngredientsStyles['grid']}`}
      style={styles}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  gap: PropTypes.string,
  columns: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ])
};

const BurgerIngredients = ({
  items
}) => {
  const tabs = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
  };

  const itemsRefs = useRef({});
  const [currentTab, setCurrentTab] = useState('bun');
  const [currentItem, setCurrentItem] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const itemsToRender = useMemo(() => (
    items.reduce((acc, item) => {
      acc[item.type] = [...acc[item.type], item];
      return acc;
    }, {bun: [], sauce: [], main: []})
  ), [items]);

  const renderIngredients = (type) => (
    itemsToRender[type].map((item) => (
      <IngredientCard
        key={item._id}
        onClick={() => {
          setIsOpen(true);
          setCurrentItem(item);
        }}
        {...item}
      />
    ))
  );

  const handleOnScroll = throttle((scrollContainer) => {
    const nearest = Object.keys(itemsRefs.current).reduce((acc, type) => {
      const el = itemsRefs.current[type];
      const diff = Math.abs(scrollContainer.scrollTop - el.offsetTop);
      if ((acc && diff < acc.diff) || !acc) {
        acc = {el, diff, type};
      }
      return acc;
    }, null);
    setCurrentTab(nearest.type);
  }, 100);

  const onTabClick = (tab) => {
    const el = itemsRefs.current[tab];
    el.scrollIntoView();
    setCurrentTab(tab);
  };

  return (
    <>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <Tabs
        current={currentTab}
        onClick={onTabClick}
        tabs={tabs}
      >
        <CustomScroll
          className="pr-4 pl-4"
          onScroll={handleOnScroll}
        >
          {
            Object.keys(itemsToRender).map((type, idx) => (
              <div
                key={idx}
                ref={(el) => itemsRefs.current[type] = el}
              >
                <h5
                  className={`${burgerIngredientsStyles['tabs-label']} ${type !== currentTab ? 'text_color_inactive' : ''} text text_type_main-medium pt-10 pb-6`}
                >
                  {tabs[type]}
                </h5>
                <Grid>
                  {renderIngredients(type)}
                </Grid>
              </div>
            ))
          }
        </CustomScroll>
      </Tabs>
      <IngredientDetails
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ingredient={currentItem}
      />
    </>
  );
};

BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(dataProptypes).isRequired
};

export default BurgerIngredients;
