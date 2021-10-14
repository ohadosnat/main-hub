import { Switch, Route } from "react-router-dom";
import Home from "../../views/Home/Home";
import Weather from "../../views/Weather/Weather";

const Content = () => {
  return (
    <main className="flex items-center justify-center h-full w-full py-20 px-6 xl:py-24 xl:px-10 font-rubik xl:pt-20">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/music" exact />
        <Route path="/weather" exact component={Weather} />
        <Route path="/settings" exact />
        <Route path="/">no match, 404 page</Route>
      </Switch>
    </main>
  );
};

export default Content;
