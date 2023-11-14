import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import { GameContext } from "./GameContext";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.render(
  <React.StrictMode>
    <GameContext>
      <BrowserRouter>
        <MantineProvider>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </GameContext>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();
