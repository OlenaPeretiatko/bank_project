import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import TransactionsAddPage from "../Pages/Transactions";

jest.mock("axios");

const data = {data: "New user was successfully created!"};

describe("Transactions page", () => {
    it("renders Transactions with form", () => {
        render(<Router><TransactionsAddPage loggedIn={
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

    it("Transactions post", async () => {
        await act(async () => {
            await axios.post.mockImplementationOnce(() => Promise.resolve(data));
            render (<Router><TransactionsAddPage loggedIn={
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

        await expect(axios.post).toHaveBeenCalledWith("/transactionsPost", {
            amount: "",
            from_wallet_id: "",
            to_wallet_id: "",
        }, {"headers": {"Authorization": "Bearer null"}});
        await expect(axios.post).toHaveBeenCalledTimes(1);
    });
});