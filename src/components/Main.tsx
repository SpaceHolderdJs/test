import React, { useContext } from 'react'
import { Navigate } from 'react-router';
import { AppContext } from '../App'
import { ActionsTypes, IUser } from '../interfaces';

export const Main = () => {
  const {data, dispatch} = useContext(AppContext);
  const {user} = data;

  if(!user) return <Navigate to="/auth" />

  const logout = () => {
    dispatch({type: ActionsTypes.LOGOUT, payload: null});
  }

  return (
    <div>
        <h3>Hello user!</h3>
        <p>Your token is: {user.token}</p>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
