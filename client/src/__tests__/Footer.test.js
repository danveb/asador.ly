import { render } from "@testing-library/react"; 
import '@testing-library/jest-dom/extend-expect';
import { store } from "../app/store"; 
import { Provider } from "react-redux";
import Footer from "../components/Footer/Footer"; 

describe("Footer component", () => {
    // smoke test
    test("renders Footer component", () => {
        render(
            <Provider store={store}>
                <Footer />
            </Provider>
        );
    });

    // snapshot test
    test("matches snapshot", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <Footer />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot(); 
    });

    // getByText
    test("displays footer text", () => {
        const { getByText } = render(
            <Provider store={store}>
                <Footer />
            </Provider>
        );
        const footerText = getByText("© All rights reserved – Danny Bae"); 
        expect(footerText).toBeInTheDocument(); 
    });
});