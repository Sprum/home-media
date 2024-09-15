import {createContext, useContext, useEffect, useState} from "react";
import {ApiContext} from "./ApiContext.jsx";
import useApi from "../api/api.js";


const FileContext = createContext([])

const FileProvider = ({children}) => {
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const [loadingContents, setLoadingContents] = useState(false)
    const [fetchContentsError, setFetchContentsError] = useState('')
    const {connected} = useContext(ApiContext)
    const api = useApi()



    useEffect(() => {
        const fetchContents = async () => {
            setLoadingContents(true)
            try {
                const res = await api.get("/list")
                setFiles(res.data['files'])
                setFolders(res.data['folders'])

            } catch (e) {
                setFetchContentsError(e)
            } finally {
                setLoadingContents(false)
            }
        }
        if (connected) {
            fetchContents()
        }
    }, [connected]);

    return (
        <FileContext.Provider value={{
            files,
            setFiles,
            folders,
            setFolders,
            loadingContents,
            setLoadingContents,
            fetchContentsError,
            setFetchContentsError
        }}>
            {children}
        </FileContext.Provider>
    )
}

export {FileContext, FileProvider}