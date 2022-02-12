import { useSelector, useDispatch } from 'react-redux';
import { getItems as getItemsAction } from '../services/actions/ingredients';

const useIngredients = () => {
  const dispatch = useDispatch();

  const {
    ingredients,
    isLoading,
    bun,
    error
  } = useSelector((store: any) => ({
    ingredients: store.ingredients.items,
    isLoading: store.ingredients.isLoading,
    bun: store.ingredients.bun,
    error: store.ingredients.error
  }));

  const getItems = () => dispatch(getItemsAction());

  return {
    ingredients,
    isLoading,
    bun,
    getItems,
    error
  };
};

export default useIngredients;
