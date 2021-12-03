import {Modal} from '../modal/modal';
import ingredientDetailsStyles from './ingredient-details.module.css';
import PropTypes, {func} from 'prop-types';
import {dataProptypes} from '../../utils/data';

const IngredientDetails = ({
  onRequestClose,
  ingredient,
  isOpen,
  ...rest
}) => {
  return (
    <Modal
      className={`${ingredientDetailsStyles['card']} pt-10 pr-10 pb-15 pl-10`}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      {...rest}
    >
      <h5 className={`${ingredientDetailsStyles['title']} text text_type_main-large pr-7`}>
        Детали ингредиента
      </h5>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h5 className={`${ingredientDetailsStyles['name']} mt-4 mb-8 text text_type_main-medium`}>
        {ingredient.name}
      </h5>
      <div className={ingredientDetailsStyles['properties']}>
        <div className={`${ingredientDetailsStyles['property']} pr-5`}>
          <span className={`${ingredientDetailsStyles['property-label']} text text_type_main-small text_color_inactive`}>
            Калорий,ккал
          </span>
          <span className={`${ingredientDetailsStyles['property-value']} text text_type_digits-default text_color_inactive`}>
            {ingredient.calories}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles['property']} pr-5`}>
          <span className={`${ingredientDetailsStyles['property-label']} text text_type_main-small text_color_inactive`}>
            Белки,г
          </span>
          <span className={`${ingredientDetailsStyles['property-value']} text text_type_digits-default text_color_inactive`}>
            {ingredient.proteins}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles['property']} pr-5`}>
          <span className={`${ingredientDetailsStyles['property-label']} text text_type_main-small text_color_inactive`}>
            Жиры,г
          </span>
          <span className={`${ingredientDetailsStyles['property-value']} text text_type_digits-default text_color_inactive`}>
            {ingredient.fat}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles['property']}`}>
          <span className={`${ingredientDetailsStyles['property-label']} text text_type_main-small text_color_inactive`}>
            Углеводы,г
          </span>
          <span className={`${ingredientDetailsStyles['property-value']} text text_type_digits-default text_color_inactive`}>
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </Modal>
  );
};

IngredientDetails.prototype = {
  ingredient: dataProptypes,
  onRequestClose: PropTypes.func,
  isOpen: PropTypes.bool
};

export default IngredientDetails;
