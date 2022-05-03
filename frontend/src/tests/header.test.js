import React from "react";
import ReactDOM from "react-dom";
import Header from "../Components/Header";
import {BrowserRouter as Router} from "react-router-dom";
import {fireEvent, render} from "@testing-library/react";
import { screen, configure } from '@testing-library/react'


describe("Header component", () => {
    it("renders header if user is not authenticated", () => {
        render(<Router><Header/></Router>);
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("renders header if user is authenticated", () => {
        render(<Router><Header loggedIn={{"username": "romek_05", "password": "roman123"}}/></Router>);
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("Wallets")).toBeInTheDocument();
        expect(screen.getByText("Transactions")).toBeInTheDocument();
    });
});