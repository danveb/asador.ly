import { render, screen } from "@testing-library/react"; 
import { store } from "../app/store"; 
import { Provider } from "react-redux";
import About from "../components/About/About"; 
import { BrowserRouter } from "react-router-dom";

describe("About component", () => {
    // smoke test
    test("renders About component", () => {
        render(<Provider store={store}>
            <BrowserRouter>
                <About />
            </BrowserRouter>
        </Provider>);
    });

    // snapshot test
    test("matches snapshot", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <About />
                </BrowserRouter>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot(); 
    });

    // getByText
    test("displays correct h1 title", () => {
        render(<Provider store={store}>
            <BrowserRouter>
                <About />
            </BrowserRouter>
        </Provider>);
        const title = screen.getByText("Buenos Aires"); 
        expect(title).not.toBe(<h3>Buenos Aires</h3>); 
    });

    // getByAltText
    test("img tag should have alt attribute", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <About />
                </BrowserRouter>
            </Provider>
        );
        const altText = screen.getByAltText("charcoal"); 
        expect(altText).toBeInTheDocument(); 
    }); 

    // getByAltText
    test("throws error with incorrect alt attribute", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <About />
                </BrowserRouter>
            </Provider>
        );
        const altText = screen.getByAltText("charcoal"); 
        expect(altText).not.toBe("brasa"); 
    }); 
});