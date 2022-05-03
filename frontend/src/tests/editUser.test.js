import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import EditUserPage from "../Pages/EditUser";

jest.mock("axios");

const data = {data: "New user was successfully created!"};

describe("Edit user page", () => {
    it("Renders Edit User Page with form", () => {
        render(<Router><EditUserPage loggedIn={
            {
                email: 'maksym_peshko@gmail.com',
                username: 'maskpesh',
                password: 'maksym123',
                first_name: 'Maksym',
                last_name: 'Peshko'
            }
        } /></Router>);
        expect(screen.getByRole("form")).toBeInTheDocument();
    });

    it("edit user", async () => {
        await act(async () => {
            await axios.patch.mockImplementationOnce(() => Promise.resolve(data));
            render (<Router><EditUserPage loggedIn={
                {
                    email: 'maksym_peshko@gmail.com',
                    username: 'maskpesh',
                    password: 'maksym123',
                    first_name: 'Maksym',
                    last_name: 'Peshko'
                }
            }
            /></Router>);
        });

        const submitBtn = screen.getByRole("form").querySelector("button");
        fireEvent.click(submitBtn);

        await expect(axios.patch).toHaveBeenCalledWith(`/editUser/undefined`, {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
        }, {"headers": {"Authorization": "Bearer null"}});
        await expect(axios.patch).toHaveBeenCalledTimes(1);
    });
});