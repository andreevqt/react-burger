import { getOrder, clearOrder } from '../services/actions/order-info';
import { useSelector, useDispatch } from '../services/store';

const useOrderInfo = () => {
  const dispatch = useDispatch();
  const get = (number: number) => dispatch(getOrder(number));
  const clear = () => dispatch((clearOrder()))
  const orderInfo = useSelector((store) => store.orderInfo);
  
  return {
    ...orderInfo,
    clear,
    get
  };
};

export default useOrderInfo;
