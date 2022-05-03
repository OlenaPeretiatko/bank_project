import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import DeleteUser from "../Components/DeleteUser";


jest.mock("axios");

const data = {data: "User was successfully deleted"};

describe("Test deleting user", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders page with form", () => {
        render(<Router><DeleteUser username={
            {
                username: 'maskpesh',
            }
        }/></Router>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("delete user", async () => {
        await act(async () => {
            await axios.delete.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><DeleteUser user={
                {
                    username: 'maskpesh',
                }
            }
            /></Router>);
        });

        const submitBtn = screen.getByTestId("btnDelete");
        fireEvent.click(submitBtn);

        await expect(axios.delete).toHaveBeenCalledWith('/deleteUser/undefined', {"headers": {"Authorization": "Bearer null"}});
        await expect(axios.delete).toHaveBeenCalledTimes(1);
    });
});