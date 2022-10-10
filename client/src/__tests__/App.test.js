import { render } from "@testing-library/react"; 
import { store } from "../app/store"; 
import { Provider } from "react-redux";
import App from "../App"; 

describe("App component", () => {
    // smoke test
    test("renders App component", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    // snapshot test
    test("matches snapshot", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot(); 
    });
});