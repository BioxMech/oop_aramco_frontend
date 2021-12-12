import React, { createContext, useReducer } from 'react';

const initialState = {
    api: "https://aramco-backend.herokuapp.com/api"
}

const Reducer = (state, action) => {
    switch (action.type) {
        // case 'SET_USER':
        //     return {
        //         ...state,
        //         user: action.payload
        //     };
        default:
            return state;
    }
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value ={ [state, dispatch] }>
            { children }
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;