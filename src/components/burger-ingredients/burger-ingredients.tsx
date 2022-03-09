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
import { TIngredient, TIngredientType } from '../../services/api';

const BurgerIngredients: React.FC = () => {
  const tabs = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };

  const itemsRefs = useRef<{ [name in TIngredientType]: HTMLDivElement | null }>({ bun: null, sauce: null, main: null });
  const [currentTab, setCurrentTab] = useState('bun');
  const { items, isLoading } = useIngredients();
  const { isLoading: isAuthLoading } = useAuth();

  const history = useHistory();
  const location = useLocation();

  const itemsToRender = useMemo(() => (
    items.reduce((acc: { bun: Array<TIngredient>; sauce: Array<TIngredient>; main: Array<TIngredient> }, item: TIngredient) => {
      acc[item.type] = [...acc[item.type], item];
      return acc;
    }, { bun: [], sauce: [], main: [] })
  ), [items]);

  const onIngredientClick = (item: TIngredient) => () => {
    history.push({
      pathname: `/ingredients/${item._id}`,
      state: { background: location }
    });
  };

  const renderIngredients = (type: TIngredientType) => (
    itemsToRender[type].map((item: TIngredient) => (
      <IngredientCard
        key={item._id}
        ingredient={item}
        onClick={onIngredientClick(item)}
      />
    ))
  );

  const handleOnScroll = useCallback(throttle((scrollContainer: HTMLDivElement) => {
    const nearest = (Object.keys(itemsRefs.current) as Array<TIngredientType>)
      .reduce((acc: { el: HTMLDivElement | null; diff: number; type: TIngredientType } | null, type: TIngredientType) => {
        const el = itemsRefs.current[type];
        if (!el) {
          return acc;
        }
        const diff = Math.abs(scrollContainer.scrollTop - el.offsetTop);
        if ((acc && diff < acc.diff) || !acc) {
          acc = { el, diff, type }; // eslint-disable-line
        }
        return acc;
      }, null);

    if (nearest) {
      setCurrentTab(nearest.type);
    }

  }, 100), []);

  const onTabClick = (tab: string) => {
    const el = itemsRefs.current[tab as TIngredientType];
    if (el) {
      el.scrollIntoView();
    }
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
                (Object.keys(itemsToRender) as Array<TIngredientType>).map((type: TIngredientType) => (
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
