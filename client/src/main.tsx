// React & CSS
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// Components & Router DOM
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// Redux & Context
import { Provider } from "react-redux";
import store from "./redux/store";
import { SpotifyWebApiProvider } from "./context/spotifyWebApiContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SpotifyWebApiProvider>
          <App />
        </SpotifyWebApiProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
