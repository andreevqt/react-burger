import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientCard from '../ingredient-card/ingredient-card';
import CustomScroll from '../custom-scroll/custom-scroll';
import throttle from '../../utils/throttle';
import IngredientSkeleton from './ingredients-skeleton/ingredients-skeleton';
import useIngredients from '../../hooks/use-ingredients';
import useAuth from '../../hooks/use-auth';

const BurgerIngredients = () => {
  const tabs = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };

  const itemsRefs = useRef({});
  const [currentTab, setCurrentTab] = useState('bun');
  const { ingredients, isLoading } = useIngredients();
  const { isLoading: isAuthLoading } = useAuth();

  const history = useHistory();
  const location = useLocation();

  const itemsToRender = useMemo(() => (
    ingredients.reduce((acc, item) => {
      acc[item.type] = [...acc[item.type], item];
      return acc;
    }, { bun: [], sauce: [], main: [] })
  ), [ingredients]);

  const onIngredientClick = (item) => () => {
    history.replace({
      pathname: `/ingredients/${item._id}`,
      state: { background: location }
    });
  };

  const renderIngredients = (type) => (
    itemsToRender[type].map((item) => (
      <IngredientCard
        key={item._id}
        ingredient={item}
        onClick={onIngredientClick(item)}
      />
    ))
  );

  const handleOnScroll = useCallback(throttle((scrollContainer) => {
    const nearest = Object.keys(itemsRefs.current).reduce((acc, type) => {
      const el = itemsRefs.current[type];
      const diff = Math.abs(scrollContainer.scrollTop - el.offsetTop);
      if ((acc && diff < acc.diff) || !acc) {
        acc = { el, diff, type }; // eslint-disable-line
      }
      return acc;
    }, null);
    setCurrentTab(nearest.type);
  }, 100), []);

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
        {
          (isLoading || isAuthLoading) ? <IngredientSkeleton /> : (
            <CustomScroll
              onScroll={handleOnScroll}
              className="pr-4"
              grow
            >
              {
                Object.keys(itemsToRender).map((type) => (
                  <div
                    key={type}
                    ref={(el) => itemsRefs.current[type] = el}
                  >
                    <h5
                      className={classNames('text text_type_main-medium pt-10 pb-6', burgerIngredientsStyles['tabs-label'], { text_color_inactive: type !== currentTab })}
                    >
                      {tabs[type]}
                    </h5>
                    <div className={burgerIngredientsStyles['grid']}>
                      {renderIngredients(type)}
                    </div>
                  </div>
                ))
              }
            </CustomScroll>
          )
        }
      </Tabs>
    </>
  );
};

export default BurgerIngredients;
