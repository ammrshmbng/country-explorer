
import { createSlice } from "@reduxjs/toolkit";

const initialState : any = [

]

export const cooperationSlice = createSlice({
    name: 'cooperation',
    initialState,
    reducers: {
        addCooperation: (state, action) => {
            state.push(action.payload);
        },
        
    }
});

export const { addCooperation} = cooperationSlice.actions;

export const selectAllCooperations = (state: any) => state.cooperation;

export default cooperationSlice.reducer;