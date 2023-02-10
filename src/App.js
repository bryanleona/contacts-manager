import React from "react";
import { Provider } from "react-redux";
import store from "./store.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import ContactList from "./ContactList.js";
import ContactForm from "./ContactForm.js";
import "bootstrap/dist/css/bootstrap.min.css";

const history = createBrowserHistory();

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Contact Manager</h1>
        <Provider store={store}>
          <Router history={history}>
            <Routes>
              <Route exact path="/" element={<ContactList/>} />
              <Route exact path="/form" element={<ContactForm/>} />
            </Routes>
          </Router>
        </Provider>
    </div>
  );
}

export default App;
