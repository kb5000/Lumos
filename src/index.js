import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import $ from 'jquery'

const USE_WINDOW = false

if(USE_WINDOW){
  const pluginFrame = $(
    `<div id="pluginFrame" style="z-index:9999;height:100vh;position:fixed;right:0;top:0;"></div>`
  );
  $("body").append(pluginFrame);
  
  const root = ReactDOM.createRoot(document.getElementById("pluginFrame"));
  root.render(<App />);
}
else{
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
}


  
