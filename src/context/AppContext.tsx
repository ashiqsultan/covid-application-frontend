import { createContext, useReducer, useEffect, useCallback } from 'react';
import { getAllDeath, getAllConfirmed } from '../api';
import countryLatLngHash from '../countryLatLngHash';
interface IWorldDataItem {
  name: string;
  count: number;
  lat: number;
  lng: number;
  deaths?: number;
  confirmed?: number;
}
export interface IAppState {
  category: 'death' | 'confirmed';
  worldData: Array<IWorldDataItem>;
}

type Action =
  | {
      type: 'SET_CATEGORY';
      payload: 'death' | 'confirmed';
    }
  | {
      type: 'SET_WORLD_DATA';
      payload: Array<IWorldDataItem>;
    };

const initialState: IAppState = {
  category: 'death',
  worldData: [],
};

const reducer = (state: IAppState, action: Action): IAppState => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    case 'SET_WORLD_DATA':
      return {
        ...state,
        worldData: action.payload,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: IAppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{ children: any }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setWorldData = useCallback(
    (data: Array<IWorldDataItem>) => {
      // Using country name map to lat lng from lat lng hash
      data.forEach((item) => {
        // @ts-ignore
        const { lat, lng } = countryLatLngHash[item.name];
        item.lat = lat;
        item.lng = lng;
        item.count = item.deaths || item.confirmed || 0;
      });
      dispatch({ type: 'SET_WORLD_DATA', payload: data });
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchAndSetInitialData = async () => {
      const data =
        state.category === 'death'
          ? await getAllDeath()
          : await getAllConfirmed();
      setWorldData(data);
    };
    fetchAndSetInitialData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
