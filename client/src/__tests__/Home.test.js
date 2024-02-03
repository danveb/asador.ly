import { render, screen } from "@testing-library/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Home } from "../pages";

describe("Home page", () => {
  // smoke test
  test("renders Home page", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  // snapshot test
  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // getByText
  test("displays all instances where Asador is mentioned", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>);
    const title = screen.getByText("Welcome to Asador");
    expect(title).toBeInTheDocument();
    expect(title).not.toBe("Welcome to our Asador");
  });
});