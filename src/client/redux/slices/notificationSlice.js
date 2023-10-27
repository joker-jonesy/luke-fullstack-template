import {createSlice} from "@reduxjs/toolkit";


// notification layout

// {
//     id:1,
//     type:"success",
//     text:"Submitted!",
//     active:true
// }


const notificationSlice = createSlice({
    name: "notifications",
    initialState: []
    ,
    reducers: {
        notify: (state, {payload}) => {
            state.push(payload)
            return state;
        },
        removeNotify: (state, {payload}) => {
            return state.map(i => i.id === payload.id ? {...i, ...payload} : i)

        }
    }
})

export default notificationSlice.reducer;
export const {notify, removeNotify} = notificationSlice.actions;