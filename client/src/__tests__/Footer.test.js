import { render, screen } from "@testing-library/react"; 
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
        render(
            <Provider store={store}>
                <Footer />
            </Provider>
        );
        const footerText = screen.getByText("© All rights reserved – Danny Bae"); 
        expect(footerText).toBeInTheDocument(); 
    });

    // getByRole
    test("anchor tag should have a target attribute", () => {
        render(
            <Provider store={store}>
                <Footer /> 
            </Provider>
        );
        const anchor = screen.getByRole("link"); 
        expect(anchor).toHaveAttribute("target"); 
    });
});