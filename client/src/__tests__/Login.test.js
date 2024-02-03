import { render, screen, fireEvent } from "@testing-library/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { Login } from "../pages";
import { BrowserRouter } from "react-router-dom";

describe("Login component", () => {
  // smoke test
  test("renders Login component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  // snapshot test
  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // getByText (with regex to find text)
  test("displays paragraph below header", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const paragraphTag = screen.getByText(/Login and start pinning your favorite/i);
    expect(paragraphTag).toBeInTheDocument();
  });

  // getAllByText
  test("displays login text", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const title = screen.getAllByText("Login");
    expect(title).toBeTruthy();
  });

  // getByLabelText
  test("displays username label", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const usernameLabel = screen.getByLabelText("Username");
    expect(usernameLabel).toBeInTheDocument();
  });

  // getByLabelText
  test("displays password label", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const passwordLabel = screen.getByLabelText("Password");
    expect(passwordLabel).toBeInTheDocument();
  });

  // getByLabelText
  test("displays initial state for username/password", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    expect(usernameInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });

  // getByLabelText, fireEvent
  test("displays username/password when added", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const username = "jojo";
    const password = "jojo123";
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(usernameInput.value).toBe("jojo");
    expect(passwordInput.value).toBe("jojo123");
  });

  // mock form submission that receives username/password and submits
  test("mock form submission", () => {
    const username = "jojo";
    const password = "jojo123";
    const mockSubmit = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login onSubmit={mockSubmit(username, password)} />
        </BrowserRouter>
      </Provider>
    );
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByRole("button", { name: "Login" });
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });
});