import { render } from "@testing-library/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { Map } from "../pages";

describe("Map component", () => {
  // smoke test
  test("renders Map component", () => {
    render(
      <Provider store={store}>
        <Map />
      </Provider>
    );
  });

  // snapshot test
  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Map />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});