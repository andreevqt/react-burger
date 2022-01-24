import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import useIngredients from '../../hooks/use-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';

const IngredientModal = () => {
  const { id } = useParams();
  const history = useHistory();
  const { ingredients } = useIngredients();

  const ingredient = useMemo(
    () => ingredients.find((item) => item._id === id),
    [id, ingredients]
  );

  const closeModal = () => history.replace({ pathname: '/' });

  return ingredient ? (
    <Modal
      className="pt-10 pr-10 pb-15 pl-10"
      onRequestClose={closeModal}
    >
      <IngredientDetails
        ingredient={ingredient}
        withinModal
      />
    </Modal>
  ) : null;
};

export default IngredientModal;
