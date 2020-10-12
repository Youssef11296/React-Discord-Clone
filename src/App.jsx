import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./comps/Sidebar";
import Chat from "./comps/Chat";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./comps/Login";
import { login, logout } from "./features/userSlice";
import { auth } from "./firebase/Config";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return user ? (
    <div className="app">
      <Sidebar />
      <Chat />
    </div>
  ) : (
    <Login />
  );
}

export default App;
