import { render } from "@testing-library/react"; 
import { store } from "../app/store"; 
import { Provider } from "react-redux";
import { MainMap } from "../components";

describe("MainMap component", () => {
    // smoke test
    // skipping tests due to Mapbox error
    test.skip("renders MainMap component", () => {
        render(
            <Provider store={store}>
                <MainMap />
            </Provider>
        );
    });

    // snapshot test
    // skipping tests due to Mapbox error
    test.skip("matches snapshot", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MainMap />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot(); 
    });
});