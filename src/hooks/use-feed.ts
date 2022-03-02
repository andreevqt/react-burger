import { feedWsClose, feedWsInit } from '../services/actions/feed';
import { useSelector, useDispatch } from '../services/store';

const useFeed = () => {
  const dispatch = useDispatch();
  const history = useSelector((store) => store.feed)
  const init = () => dispatch(feedWsInit());
  const close = () => dispatch(feedWsClose());

  return {
    ...history,
    init,
    close
  };
};

export default useFeed;
