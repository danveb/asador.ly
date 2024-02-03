import { render, screen, fireEvent } from "@testing-library/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { Register } from "../pages";
import { BrowserRouter } from "react-router-dom";

describe("Register component", () => {
  // smoke test
  test("renders Register component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
  });

  // snapshot test
  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
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
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const paragraphTag = screen.getByText(/Create an account to share with us your favorite/);
    expect(paragraphTag).toBeInTheDocument();
  });

  // getAllByText
  test("displays Register text", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const title = screen.getAllByText("Register");
    expect(title).toBeTruthy();
  });

  // getByLabelText
  test("displays username label", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const usernameLabel = screen.getByLabelText("Username");
    expect(usernameLabel).toBeInTheDocument();
  });

  // getByLabelText
  test("displays email label", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const emailLabel = screen.getByLabelText("Email");
    expect(emailLabel).toBeInTheDocument();
  });

  // getByLabelText
  test("displays password label", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
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
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    expect(usernameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });

  // getByLabelText, fireEvent
  test("displays username/email/password when added", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const username = "jojo";
    const email = "jojo@gmail.com";
    const password = "jojo123";
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(usernameInput.value).toBe("jojo");
    expect(emailInput.value).toBe("jojo@gmail.com");
    expect(passwordInput.value).toBe("jojo123");
  });

  // getByRole 
  test("displays Register button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const registerBtn = screen.getByRole("button", { name: "Register" });
    expect(registerBtn).toBeInTheDocument();
  });

  // mock form submission that receives username/password and submits
  test("mock form submission", () => {
    const username = "jojo";
    const email = "jojo@gmail.com";
    const password = "jojo123";
    const mockSubmit = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register onSubmit={mockSubmit(username, email, password)} />
        </BrowserRouter>
      </Provider>
    );
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByRole("button", { name: "Register" });
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalled();
  });
});