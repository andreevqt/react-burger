import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import useIngredients from '../../hooks/use-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { TIngredient } from '../../services/api';

const IngredientModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { items } = useIngredients();

  const ingredient = useMemo(
    () => items.find((item: TIngredient) => item._id === id),
    [id, items]
  );

  const closeModal = () => history.goBack();

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
