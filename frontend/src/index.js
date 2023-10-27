import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
//chatbox
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';
Kommunicate.init("2dd6065d2b32f8a5e9a0cf9072f712c87", "popupWidget : true ", "automaticChatOpenOnNavigation: true")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
