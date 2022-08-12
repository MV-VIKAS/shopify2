const { createSlice } = require("@reduxjs/toolkit");

let initialState = {
    isOpen:false
}
const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        OpenLogin: (state, action) => {
            state.isOpen = true;
        },
        CloseLogin: (state, action) => {
            state.isOpen = false;
        }
        
    }
})

export default LoginSlice.reducer;
export const {OpenLogin,CloseLogin}=LoginSlice.actions