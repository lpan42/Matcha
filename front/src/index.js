import React from "react";
import ReactDOM from "react-dom";//for vitual DOM render()
import App from "./App";
import "./style/App.css";

ReactDOM.render(<App />, document.getElementById("root")); 
                //(what html elements to render, where to render it in div root)
                //instance of component funciton, 