import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import Register from "../Pages/Register";

jest.mock("axios");

const data = {data: "New user was successfully created!"};

describe("Register page", () => {
    it("renders Register with form", () => {
        render(<Router><Register handleLogin={jest.fn} /></Router>);
        expect(screen.getByRole("form")).toBeInTheDocument();
    });

    it("registers user", async () => {
        await act(async () => {
            await axios.post.mockImplementationOnce(() => Promise.resolve(data));
            render (<Router><Register
                handleLogin={jest.fn}
            /></Router>);
        });

        const submitBtn = screen.getByRole("form").querySelector("button");
        fireEvent.click(submitBtn);

        await expect(axios.post).toHaveBeenCalledWith("/register", {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
        });
        await expect(axios.post).toHaveBeenCalledTimes(1);
    });
});
