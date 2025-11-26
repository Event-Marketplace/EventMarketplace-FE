import decodeToken from "@/lib/decodeToken";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface AuthState{
    accessToken: string | null;
    userEmail: string | null;
}

const initialState: AuthState = {accessToken: null, userEmail: null}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>){
            state.accessToken = action.payload;
            const decoded = decodeToken(action.payload);
            state.userEmail = decoded?.email ?? null;
        },
        clearAccessToken(state){
            state.accessToken = null;
            state.userEmail = null;
        },
    },
});

export const {setAccessToken, clearAccessToken} = authSlice.actions;
export default authSlice.reducer;