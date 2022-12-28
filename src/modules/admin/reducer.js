import { createSlice } from "@reduxjs/toolkit";

import history from "../../utils/history.js";
import { openNotification } from "../../utils/notification.js";
import { actionAdminLogin, actionAdminLogout, actionAdminProfile } from "./action.js";

const initialState = {
    admin: {},
    login: false,
};

export const sliceAdmin = createSlice({
    name: "admin",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        //admin profile success
        builder.addCase(
            actionAdminProfile.fulfilled,
            (state, { meta, payload, type }) => {

                state.login = true;
            }
        );
        //admin profile failure
        builder.addCase(
            actionAdminProfile.rejected,
            (state, { meta, payload, type, error }) => {
                history.push("/login");
                console.log(error);
            }
        );
        //admin login success
        builder.addCase(
            actionAdminLogin.fulfilled,
            (state, { meta, payload, type }) => {
                state.login = true;

                history.push("/home");
            }
        );


        //admin login failure
        builder.addCase(
            actionAdminLogin.rejected,
            (state, { meta, payload, type, error }) => {
                openNotification("error", "Tài khoản không tồn tại!");
            }
        );


        //admin login success
        builder.addCase(
            actionAdminLogout.fulfilled,
            (state, { meta, payload, type }) => {
                state.login = false;

                history.push("/login");
            }
        );
    },
});

export const { } = sliceAdmin.actions;