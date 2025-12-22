import decodeToken from "@/lib/decodeToken";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface AuthState{
    accessToken: string | null;
    userEmail: string | null;
    roles: string[];
    currentContext: "Admin" | "Organizer" | "Member" | null;
}

const savedContext = localStorage.getItem("currentContext") as
  | "Admin"
  | "Organizer"
  | "Member"
  | null;

const initialState: AuthState = {accessToken: null, userEmail: null, roles: [], currentContext: savedContext}
const roleClaimKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>){
            state.accessToken = action.payload;
            const decoded = decodeToken(action.payload);
            state.userEmail = decoded?.email ?? null;
            state.roles = decoded?.[roleClaimKey] ?? [];
        },
        clearAccessToken(state){
            state.accessToken = null;
            state.userEmail = null;
            state.roles = [];
            state.currentContext = null;
        },
        setCurrentContext(state, action: PayloadAction<"Admin" | "Organizer" | "Member" | null>) {
            state.currentContext = action.payload;
        },
    },
});

export const {setAccessToken, clearAccessToken, setCurrentContext} = authSlice.actions;
export default authSlice.reducer;