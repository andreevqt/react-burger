import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientCard from '../ingredient-card/ingredient-card';
import CustomScroll from '../custom-scroll/custom-scroll';
import IngredientDetails from '../ingredient-details/ingredient-details';
import throttle from '../../utils/throttle';
import Modal from '../modal/modal';
import IngredientSkeleton from './ingredients-skeleton/ingredients-skeleton';
import { setModalContent } from '../../services/actions/ingredients-modal';

const BurgerIngredients = () => {
  const tabs = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };

  const itemsRefs = useRef({});
  const [currentTab, setCurrentTab] = useState('bun');
  const dispatch = useDispatch();
  const { ingredients, currentIngredient, isLoading } = useSelector((store) => ({
    ingredients: store.ingredients.items,
    currentIngredient: store.ingredientsModal.content,
    isLoading: store.ingredients.isLoading,
  }));

  const closeModal = () => dispatch(setModalContent(null));
  const openModal = (item) => dispatch(setModalContent(item));

  const itemsToRender = useMemo(() => (
    ingredients.reduce((acc, item) => {
      acc[item.type] = [...acc[item.type], item];
      return acc;
    }, { bun: [], sauce: [], main: [] })
  ), [ingredients]);

  const renderIngredients = (type) => (
    itemsToRender[type].map((item) => (
      <IngredientCard
        key={item._id}
        ingredient={item}
        onClick={() => openModal(item)}
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
          isLoading ? <IngredientSkeleton /> : (
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
      {
        currentIngredient && (
          <Modal
            className="pt-10 pr-10 pb-15 pl-10"
            onRequestClose={closeModal}
          >
            <IngredientDetails
              ingredient={currentIngredient}
            />
          </Modal>
        )
      }
    </>
  );
};

export default BurgerIngredients;
