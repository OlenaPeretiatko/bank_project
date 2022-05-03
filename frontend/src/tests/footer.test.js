import React from "react";
import Footer from "../Components/Footer";
import {BrowserRouter as Router} from "react-router-dom";
import {fireEvent, render} from "@testing-library/react";
import { screen, configure } from '@testing-library/react'


describe("Footer component", () => {
    it("renders footer if user is not authenticated", () => {
        render(<Router><Footer/></Router>);
        expect(screen.getByText("© 2022 Olena Peretiatko")).toBeInTheDocument();
    });

    it("renders footer if user is authenticated", () => {
        render(<Router><Footer loggedIn={{"username": "romek_05", "password": "roman123"}}/></Router>);
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("Wallets")).toBeInTheDocument();
        expect(screen.getByText("Transactions")).toBeInTheDocument();
    });
});