import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../services/actions/ingredients';

const useIngredients = () => {
  const dispatch = useDispatch();

  const {
    ingredients,
    isLoading,
    bun,
    error
  } = useSelector((store) => ({
    ingredients: store.ingredients.items,
    isLoading: store.ingredients.isLoading,
    bun: store.ingredients.bun,
    error: store.ingredients.error
  }));

  useEffect(() => {
    if (!ingredients.length && !isLoading) {
      dispatch(getItems());
    }
  }, []);

  return {
    ingredients,
    isLoading,
    bun,
    error
  };
};

export default useIngredients;
