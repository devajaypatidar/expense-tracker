 import React, {createContext, useReducer} from 'react';
 import AppReducer from './AppReducer';
 import axios from 'axios';

 //intial state

 const intialState = {
    transactions : [],
    error: null,
    loading: true
 }

 //create context

 export const GlobalContext = createContext(intialState);

 //provider components

 export const GlobalProvider = ( {children}) => {
    const [state , dispatch] = useReducer(AppReducer,intialState);

    //Actions

    async function getTransactions(){
        try{
            const res = await axios.get('/api/v1/transactions');
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })

        }catch(err){

            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });

        }
    }

    async function deleteTransaction(id){

        try{
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        }catch(err){
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }

        
    }

    async function addTransaction(transaction){

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const res = await axios.post('/api/v1/transactions',transaction,config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        }catch(err){
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }

        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction,
        })
    }

    console.log("this is global context");
    console.log(state.transactions);

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransactions,
        error: state.error,
        loading : state.loading,
    }}>
        {children}
    </GlobalContext.Provider>)
 }