import { render, fireEvent } from "@testing-library/react"; 
import '@testing-library/jest-dom/extend-expect';
import { store } from "../app/store"; 
import { Provider } from "react-redux";
import Login from "../components/Login/Login"; 
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
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        const paragraphTag = getByText(/Login and start pinning your favorite/); 
        expect(paragraphTag).toBeInTheDocument(); 
    });

    // getAllByText
    test("displays login text", () => {
        const { getAllByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        const title = getAllByText("Login"); 
        expect(title).toBeTruthy(); 
    });

    // getByLabelText
    test("displays username label", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        const usernameLabel = getByLabelText("Username"); 
        expect(usernameLabel).toBeInTheDocument(); 
    });

    // getByLabelText
    test("displays password label", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
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
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        const usernameInput = getByLabelText("Username");
        const passwordInput = getByLabelText("Password");
        expect(usernameInput.value).toBe(""); 
        expect(passwordInput.value).toBe(""); 
    });

    // getByLabelText, fireEvent
    test("displays username/password when added", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        const username = "jojo";
        const password = "jojo123"; 
        const usernameInput = getByLabelText("Username"); 
        const passwordInput = getByLabelText("Password"); 
        fireEvent.change(usernameInput, { target: { value: username }}); 
        fireEvent.change(passwordInput, { target: { value: password }}); 
        expect(usernameInput.value).toBe("jojo"); 
        expect(passwordInput.value).toBe("jojo123"); 
    });

    // mock form submission that receives username/password and submits
    test("mock form submission", () => {
        const username = "jojo";
        const password = "jojo123"; 
        const mockSubmit = jest.fn(); 
        const { getByLabelText, getByRole } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login onSubmit={mockSubmit(username, password)} />
                </BrowserRouter>
            </Provider>
        );
        const usernameInput = getByLabelText("Username"); 
        const passwordInput = getByLabelText("Password"); 
        const submitBtn = getByRole("button", { name: "Login" }); 
        fireEvent.change(usernameInput, { target: { value: username }}); 
        fireEvent.change(passwordInput, { target: { value: password }}); 
        fireEvent.click(submitBtn); 
        expect(mockSubmit).toHaveBeenCalled(); 
    });
});