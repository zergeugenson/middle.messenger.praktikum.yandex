import type { AppState } from '@/types';
import { StoreEvents } from '@/store';
import { isEqual } from './utils';

export function connect(
  mapStateToProps: (state: AppState) => Partial<AppState>,
) {
  return function (Component: any) {
    return class extends Component {
      public readonly onChangeStoreCallback: () => void;

      constructor(props: any) {
        const store = window.store;
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount(): void {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
