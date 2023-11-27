import { createContext, useReducer, useEffect, useCallback } from 'react';

export interface IAppState {
  test: string;
}

type Action = {
  type: 'SET_TEST';
  payload: string;
};

const initialState: IAppState = {
  test: 'test',
};

const reducer = (state: IAppState, action: Action): IAppState => {
  switch (action.type) {
    case 'SET_TEST':
      return {
        ...state,
        test: action.payload,
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

  //   const setTest = useCallback(
  //     (payload: string) => dispatch({ type: 'SET_TEST', payload }),
  //     [dispatch]
  //   );

  useEffect(() => {}, []);
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
