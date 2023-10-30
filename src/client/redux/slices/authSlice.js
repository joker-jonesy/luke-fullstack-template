import {createSlice} from "@reduxjs/toolkit";
import {api} from "../api/api";

//session storage key
const CREDENTIALS = "credentials";

function storeToken(state, {payload}){
    state.credentials = {token: payload.token, user: {...payload.user}};
    window.sessionStorage.setItem(
        CREDENTIALS,
        JSON.stringify({
            token: payload.token,
            user: {...payload.user}
        })
    )
}


const authSlice = createSlice({
    name: "auth",
    initialState: {
        credentials : JSON.parse(window.sessionStorage.getItem(CREDENTIALS)) || {
            token:"",
            user: {userId:null,
                admin:false,
                image:null
            }
        }
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
        builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
        builder.addMatcher(api.endpoints.edit.matchFulfilled, (state, {payload})=>{
            state.credentials ={
                ...state.credentials,
                user: payload
            }
        });
        builder.addMatcher(api.endpoints.logout.matchFulfilled, (state)=>{
            state.credentials = {
                token:"",
                user: {userId:null, admin:false, image:null}
            };
            window.sessionStorage.removeItem(CREDENTIALS)
        });
    }
})

export default  authSlice.reducer;