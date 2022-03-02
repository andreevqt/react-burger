import { useSelector, useDispatch } from '../services/store';
import { getItems as getItemsAction } from '../services/actions/ingredients';
import { TIngredient } from '../services/api';

const comparator = (a: TIngredient, b: TIngredient) => {
  if (a.type === 'bun' && ['sauce', 'main'].includes(b.type)) {
    return -1;
  }

  if (['sauce', 'main'].includes(a.type) && b.type === 'bun') {
    return 1;
  }

  return 0;
};

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

  const getItems = () => dispatch(getItemsAction());

  const collect = (ids: string[]) => {
    const ingredientsCpy = ingredients.map((item) => ({ ...item }));
    return ids
      .map((id) => ingredientsCpy.find((ingredient) => ingredient._id === id))
      .reduce((acc: TIngredient[], current) => {
        const found = acc.find((item) => item._id === current?._id);
        if (found) {
          found.count = found.count ? found.count + 1 : 1;
          return acc;
        }
        if (current) {
          current.count = 1;
          acc.push(current);
        }
        return acc;
      }, [])
      .sort(comparator);
  };

  const calculateAmount = (items: TIngredient[]) => items.reduce((acc, current) => acc + (current ? current.price * (current.count || 1) : 0), 0);

  return {
    ingredients,
    isLoading,
    bun,
    getItems,
    collect,
    calculateAmount,
    error
  };
};

export default useIngredients;
