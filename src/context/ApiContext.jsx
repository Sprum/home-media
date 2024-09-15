import {createContext, useEffect, useState} from "react";

const ApiContext = createContext(null)

const ApiProvider = ({children}) => {

    const [connected, setConnected] = useState(false)
    const [baseUrl, setBaseUrl] = useState(()=>{
        return localStorage.getItem('baseUrl') || null;
    })

    useEffect(() => {

        if (baseUrl) {
            localStorage.setItem('baseUrl', baseUrl)
        }
    }, [baseUrl]);

    return (
        <ApiContext.Provider value={{baseUrl, setBaseUrl, connected, setConnected}}>
            {children}
        </ApiContext.Provider>
    )
}
export {ApiContext, ApiProvider}