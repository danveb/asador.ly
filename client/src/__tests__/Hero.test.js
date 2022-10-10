import { render } from "@testing-library/react"; 
import { store } from "../app/store"; 
import { Provider } from "react-redux";
import Hero from "../components/Hero/Hero"; 

describe("Hero component", () => {
    // smoke test
    test("renders Hero component", () => {
        render(
            <Provider store={store}>
                <Hero />
            </Provider>
        );
    });

    // snapshot test
    test("matches snapshot", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <Hero />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot(); 
    });
});