import decodeToken from "@/lib/decodeToken";
import { Roles } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    accessToken: string | null;
    userEmail: string | null;
    roles: string[];
    currentContext: Roles
    userId: string | null;
}

const initialState: AuthState = {accessToken: null, userEmail: null, roles: [], currentContext: null, userId: null}
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
            state.userId = decoded?.sub ?? null;
        },
        clearAccessToken(state){
            state.accessToken = null;
            state.userEmail = null;
            state.roles = [];
            state.currentContext = null;
            state.userId = null;
        },
        setCurrentContext(state, action: PayloadAction<Roles>) {
            state.currentContext = action.payload;
        },
    },
});

export const {setAccessToken, clearAccessToken, setCurrentContext} = authSlice.actions;
export default authSlice.reducer;