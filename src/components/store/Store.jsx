import React, { createContext, useReducer } from 'react';

const initialState = {
    api: "http://127.0.0.1:8080/api"
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