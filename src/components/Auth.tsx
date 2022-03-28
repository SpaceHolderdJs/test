import React, { useContext, useEffect, useState } from "react";
import { Navigate, NavigateOptions, useNavigate } from "react-router";
import { login } from "../api/api";
import { AppContext } from "../App";
import useLocalStorage from "../hooks/useLocalStorage";
import { ActionsTypes, IAppContext, IUser } from "../interfaces";

const initialUserData = { password: "", email: "" };

export const Auth = () => {
  const { data, dispatch, localStorageUser } = useContext(AppContext);
  const {user, isLoading} = data;

  const navigate = useNavigate();

  const [userData, setUserData] =
    useState<Omit<IUser, "token">>(initialUserData);

  const { email, password } = userData;

  const auth = async () => {
    dispatch({type: ActionsTypes.LOADING, payload: true});
    const user = await login(userData);
    dispatch({type: ActionsTypes.LOADING, payload: false});

    dispatch({ type: ActionsTypes.AUTH, payload: user as IUser });
    //navigate("/main");
  };

  if (user) return <Navigate to="/main" />;
  if (isLoading) return <p>Loading...</p>

  return (
    <div className="form">
      <input
        placeholder="email"
        type="email"
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        value={email}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        value={password}
      />
      <button onClick={auth} disabled={!email || !password}>
        Accept
      </button>
    </div>
  );
};
