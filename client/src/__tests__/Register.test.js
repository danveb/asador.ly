import { render, fireEvent } from "@testing-library/react"; 
import '@testing-library/jest-dom/extend-expect';
import { store } from "../app/store"; 
import { Provider } from "react-redux";
import Register from "../components/Register/Register"; 
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
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const paragraphTag = getByText(/Create an account to share with us your favorite/); 
        expect(paragraphTag).toBeInTheDocument(); 
    });

    // getAllByText
    test("displays Register text", () => {
        const { getAllByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const title = getAllByText("Register"); 
        expect(title).toBeTruthy(); 
    });

    // getByLabelText
    test("displays username label", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const usernameLabel = getByLabelText("Username"); 
        expect(usernameLabel).toBeInTheDocument(); 
    });

    // getByLabelText
    test("displays email label", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const emailLabel = getByLabelText("Email"); 
        expect(emailLabel).toBeInTheDocument(); 
    });

    // getByLabelText
    test("displays password label", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const passwordLabel = getByLabelText("Password"); 
        expect(passwordLabel).toBeInTheDocument(); 
    });

    // getByLabelText
    test("displays initial state for username/password", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const usernameInput = getByLabelText("Username");
        const emailInput = getByLabelText("Email");
        const passwordInput = getByLabelText("Password");
        expect(usernameInput.value).toBe(""); 
        expect(emailInput.value).toBe(""); 
        expect(passwordInput.value).toBe(""); 
    });

    // getByLabelText, fireEvent
    test("displays username/email/password when added", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const username = "jojo";
        const email = "jojo@gmail.com";
        const password = "jojo123"; 
        const usernameInput = getByLabelText("Username"); 
        const emailInput = getByLabelText("Email"); 
        const passwordInput = getByLabelText("Password"); 
        fireEvent.change(usernameInput, { target: { value: username }}); 
        fireEvent.change(emailInput, { target: { value: email }}); 
        fireEvent.change(passwordInput, { target: { value: password }}); 
        expect(usernameInput.value).toBe("jojo"); 
        expect(emailInput.value).toBe("jojo@gmail.com"); 
        expect(passwordInput.value).toBe("jojo123"); 
    });

    // getByRole 
    test("displays Register button", () => {
        const { getByRole } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const registerBtn = getByRole("button", { name: "Register" }); 
        expect(registerBtn).toBeInTheDocument(); 
    });

    // mock form submission that receives username/password and submits
    test("mock form submission", () => {
        const username = "jojo";
        const email = "jojo@gmail.com";
        const password = "jojo123"; 
        const mockSubmit = jest.fn(); 
        const { getByLabelText, getByRole } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register onSubmit={mockSubmit(username, email, password)} />
                </BrowserRouter>
            </Provider>
        );
        const usernameInput = getByLabelText("Username"); 
        const emailInput = getByLabelText("Email"); 
        const passwordInput = getByLabelText("Password"); 
        const submitBtn = getByRole("button", { name: "Register" }); 
        fireEvent.change(usernameInput, { target: { value: username }}); 
        fireEvent.change(emailInput, { target: { value: email }}); 
        fireEvent.change(passwordInput, { target: { value: password }}); 
        fireEvent.click(submitBtn); 
        expect(mockSubmit).toHaveBeenCalled(); 
    });
});