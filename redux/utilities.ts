import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
    category: string;
    server: string;
    test: string
}

const initialState: InitialStateProps = {
    category: 'sub',
    server: 'vidstreaming',
    test: 'work'
}

const selectUtilities = createSlice({
    name: 'Utilities',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            return { ...state, category: action.payload }
        },
        setServer: (state, action: PayloadAction<string>) => {
            return { ...state, server: action.payload }
        },
        setTest: (state, action: PayloadAction<string>) => {
            state.test = action.payload
        }
    }
})

export const { setCategory, setServer, setTest } = selectUtilities.actions;

export default selectUtilities.reducer;