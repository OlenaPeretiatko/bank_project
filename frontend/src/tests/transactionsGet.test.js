import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import TransactionsPage from "../Pages/TransactionsPage";

describe("Transactions page", () => {
    it("renders Transactions", () => {
        render(<Router><TransactionsPage
            loggedIn={
                {
                    email: 'maksym_peshko@gmail.com',
                    username: 'maskpesh',
                    password: 'maksym123',
                    first_name: 'Maksym',
                    last_name: 'Peshko'
                }
            }
        /></Router>);
        expect(screen.getAllByRole("link")).toHaveLength(2);
    });
});