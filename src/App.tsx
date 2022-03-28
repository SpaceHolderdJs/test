import React, {
  createContext,
  Dispatch,
  Reducer,
  useEffect,
  useReducer,
} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Auth } from "./components/Auth";
import { Main } from "./components/Main";

import "./App.css";
import {
  ActionsTypes,
  IAction,
  IAppContext,
  IReducerData,
  IUser,
} from "./interfaces";
import useLocalStorage from "./hooks/useLocalStorage";

export const AppContext = createContext({} as IAppContext);

const initialReducerState: IReducerData = {
  user: null,
  isLoading: false,
};

function App() {
  const [localStorageUser, setLocalStorageUser] = useLocalStorage<IUser | null>(
    "user",
    null
  );

  const reducer = (data: IReducerData, action: IAction) => {
    switch (action.type) {
      case ActionsTypes.AUTH:
        setLocalStorageUser(action.payload as IUser);
        return { ...data, user: action.payload };
      case ActionsTypes.LOGOUT:
        setLocalStorageUser(null);
        return { ...data, user: action.payload };
      case ActionsTypes.LOADING:
        return { ...data, isLoading: action.payload };
      default:
        return data;
    }
  };

  const [data, dispatch] = useReducer(
    reducer as Reducer<IReducerData, IAction>,
    initialReducerState
  );

  useEffect(() => {
    console.log("user from local", localStorageUser);
    localStorageUser &&
      dispatch({ type: ActionsTypes.AUTH, payload: localStorageUser as IUser });
  }, [localStorageUser]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ data, dispatch, localStorageUser }}>
        <Routes>
          <Route index element={<Auth />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/main" element={<Main />}></Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
