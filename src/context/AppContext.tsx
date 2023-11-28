import { createContext, useReducer, useEffect, useCallback } from 'react';
import { getAllDeath, getAllConfirmed, getByCountry } from '../api';
import countryLatLngHash from '../countryLatLngHash';
interface IWorldDataItem {
  name: string;
  count: number;
  lat: number;
  lng: number;
  deaths?: number;
  confirmed?: number;
}
interface ICountryInfo {
  name?: string;
  confirmed?: number;
  deaths?: number;
  recovered?: number;
  active?: number;
  new_cases?: number;
  new_deaths?: number;
  new_recovered?: number;
  deaths_per_100_cases?: number;
  recovered_per_100_cases?: number;
  deaths_per_100_recovered?: number;
  confirmed_last_week?: number;
  one_week_change?: number;
  one_week_percent_increase?: number;
  who_region?: string;
}
export interface IAppState {
  category: 'death' | 'confirmed';
  worldData: Array<IWorldDataItem>;
  selectedCountry?: string;
  countryInfo?: ICountryInfo;
}

type Action =
  | {
      type: 'SET_CATEGORY';
      payload: 'death' | 'confirmed';
    }
  | {
      type: 'SET_WORLD_DATA';
      payload: Array<IWorldDataItem>;
    }
  | {
      type: 'SET_SELECTED_COUNTRY';
      payload: string;
    }
  | {
      type: 'SET_COUNTRY_INFO';
      payload: ICountryInfo;
    };

const initialState: IAppState = {
  category: 'death',
  worldData: [],
  selectedCountry: '',
  countryInfo: {},
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
    case 'SET_SELECTED_COUNTRY':
      return {
        ...state,
        selectedCountry: action.payload,
      };
    case 'SET_COUNTRY_INFO':
      return {
        ...state,
        countryInfo: action.payload,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: IAppState;
  dispatch: React.Dispatch<Action>;
  setSelectedCountry: (country: string) => void;
  setCategory: (category: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  setSelectedCountry: () => null,
  setCategory: () => null,
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
  const setSelectedCountry = useCallback(
    (country: string) => {
      dispatch({ type: 'SET_SELECTED_COUNTRY', payload: country });
    },
    [dispatch]
  );

  const setCategory = useCallback(
    (category: string) => {
      // @ts-ignore
      dispatch({ type: 'SET_CATEGORY', payload: category });
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchAndSetCountryInfo = async () => {
      const countryInfo = await getByCountry(state.selectedCountry || '');
      dispatch({ type: 'SET_COUNTRY_INFO', payload: countryInfo });
    };
    fetchAndSetCountryInfo();
  }, [state.selectedCountry]);

  useEffect(() => {
    const fetchAndSetWorldData = async () => {
      const data =
        state.category === 'death'
          ? await getAllDeath()
          : await getAllConfirmed();
      setWorldData(data);
    };
    fetchAndSetWorldData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        setSelectedCountry,
        setCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
