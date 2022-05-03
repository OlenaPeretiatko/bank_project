import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import DeleteWallet from "../Components/DeleteWallet";



jest.mock("axios");

const data = {data: "Wallet was successfully deleted!"};

describe("Wallet page", () => {
    it("renders wallet page with form", () => {
        render(<Router><DeleteWallet uid={
            {
                uid: '',
            }
        }/></Router>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("delete wallet", async () => {
        await act(async () => {
            await axios.delete.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><DeleteWallet wallet={{
                                             uid: '',
                                         }}
            /></Router>);
        });

        const submitBtn = screen.getByTestId("btnDelete");
        fireEvent.click(submitBtn);

        await expect(axios.delete).toHaveBeenCalledWith('/walletDelete/undefined', {"headers": {"Authorization": "Bearer null"}});
        await expect(axios.delete).toHaveBeenCalledTimes(1);
    });
});