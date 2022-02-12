import { Location } from 'history';

export type TState = {
  background?: Location<TState>;
  from?: Location<TState>;
}
