import React, { useReducer } from "react";
import AlertContext from "../alert/alertContext";
import AlertReducer from '../alert/alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = (props) => {
    const initialState = null;
    // const initialState = {
    //     alert : null
    // }

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Alert popup from 
    const setAlert = (msg, type) => {
        dispatch({type: SET_ALERT, payload: { msg, type }});
        setTimeout(() => dispatch({type: REMOVE_ALERT}), 3000);
    }



    return <AlertContext.Provider
        value={{
            alert: state,
            setAlert
        }
        }>
        {props.children}
    </AlertContext.Provider>
}

export default AlertState;