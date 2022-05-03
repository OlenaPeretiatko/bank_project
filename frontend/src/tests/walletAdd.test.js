import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import WalletAddPage from "../Pages/WalletAddPage";

jest.mock("axios");

const data = {data: "New wallet was successfully created!"};

describe("Wallet page", () => {
    it("renders wallets with form", () => {
        render(<Router><WalletAddPage loggedIn={
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

    it("registers wallet", async () => {
        await act(async () => {
            await axios.post.mockImplementationOnce(() => Promise.resolve(data));
            render (<Router><WalletAddPage loggedIn={
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

        await expect(axios.post).toHaveBeenCalledWith("/walletCreate", {
            name: "",
            funds: "",
            owner_id: "",
        });
        await expect(axios.post).toHaveBeenCalledTimes(1);
    });
});