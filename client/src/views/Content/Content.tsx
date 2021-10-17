import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Player from "../Player/Player";
import Settings from "../Settings/Settings";
import Weather from "../Weather/Weather";

const Content = () => {
  return (
    <main className="flex items-center justify-center h-full w-full py-20 px-6 xl:py-24 xl:px-10 font-rubik xl:pt-20">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/player" exact component={Player} />
        <Route path="/weather" exact component={Weather} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/">no match, 404 page</Route>
      </Switch>
    </main>
  );
};

export default Content;
