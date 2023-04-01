import { render } from "@testing-library/react"; 
import { store } from "../app/store"; 
import { Provider } from "react-redux";
import { MainMap } from "../components";

describe("MainMap component", () => {
    // smoke test
    test("renders MainMap component", () => {
        render(
            <Provider store={store}>
                <MainMap />
            </Provider>
        );
    });

    // snapshot test
    test("matches snapshot", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MainMap />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot(); 
    });
});