import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import Content from "./components/Content/Content";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen xl:flex xl:justify-center xl:items-center">
        <div className="App relative h-full xl:h-3/5 xl:w-4/5 xl:rounded-xl xl:overflow-hidden xl:shadow-2xl 2xl:w-3/5">
          <Overlay />
          <Content />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
