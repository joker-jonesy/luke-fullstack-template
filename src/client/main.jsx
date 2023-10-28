import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./store";
import Nav from "./components/navigation/Nav";
import Footer from "./components/navigation/Footer";
import Notifications from "./components/notifications/Notifications";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Notifications/>
                <Nav/>
                <App/>
                <Footer/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
