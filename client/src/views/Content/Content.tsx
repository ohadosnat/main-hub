import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { selectUser } from "../../redux/store";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Player from "../Player/Player";
import Settings from "../Settings/Settings";
import Signup from "../Signup/Signup";
import TestingZone from "../TestingZone";
import Weather from "../Weather/Weather";

const Content = () => {
  const [protectedProps, setProtectedProps] = useState({
    isAuthenticated: false,
    redirectPath: "/",
  });

  const location = useLocation();
  const { uid } = useSelector(selectUser);

  useEffect(() => {
    setProtectedProps((state) => ({
      ...state,
      isAuthenticated: uid ? true : false,
    }));
  }, [uid]);

  return (
    <main className="flex items-center justify-center h-full w-full py-20 px-6 xl:py-24 xl:px-10 font-rubik xl:pt-20">
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact component={Home} />
          <Route path="/player" exact component={Player} />
          <Route path="/weather" exact component={Weather} />
          <Route path="/settings" exact component={Settings} />
          <ProtectedRoute
            {...protectedProps}
            component={Login}
            exact
            path="/login"
          />
          <ProtectedRoute
            {...protectedProps}
            component={Signup}
            exact
            path="/signup"
          />
          <Route path="/">
            ⚒ This page might be under constructions or it doesn't exists ⚒
          </Route>
        </Switch>
      </AnimatePresence>
    </main>
  );
};

export default Content;
