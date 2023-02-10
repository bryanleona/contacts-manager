import React from "react";
import { render } from "@testing-library/react";
import App from "./App.js";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";

const history = createMemoryHistory();

describe("App component", () => {
    it("renders Contact Manager text", () => {
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );
        const headerElement = getByText("Contact Manager");
        expect(headerElement).toBeInTheDocument();
    });
});