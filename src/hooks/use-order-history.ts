import { historyWsClose, historyWsInit } from '../services/actions/history';
import { useSelector, useDispatch } from '../services/store';

const useOrderHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector((store) => store.history)
  const init = () => dispatch(historyWsInit());
  const close = () => dispatch(historyWsClose());

  return {
    ...history,
    init,
    close
  };
};

export default useOrderHistory;
