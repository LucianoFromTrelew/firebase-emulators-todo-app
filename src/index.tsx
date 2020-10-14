import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
import "firebase/firestore";

import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

const env = process.env.NODE_ENV;
if (env.match(/development/i) || window.location.hostname === "localhost") {
  firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
