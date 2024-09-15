import {createContext, useContext, useEffect, useState} from "react";
import {ApiContext} from "./ApiContext.jsx";
import useApi from "../api/api.js";


const stripRoot = (path) =>{
    if (path.startsWith('./')){
        return path.slice(2)+'/'
    }
    return path
}

const FileContext = createContext([])

const FileProvider = ({children}) => {
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const [root, setRoot] = useState([])
    const [loadingContents, setLoadingContents] = useState(false)
    const [fetchContentsError, setFetchContentsError] = useState('')
    const {connected} = useContext(ApiContext)
    const api = useApi()



    useEffect(() => {
        const fetchContents = async () => {
            setLoadingContents(true)
            try {
                const res = await api.get("/list")
                setRoot(stripRoot(res.data['root'][0]))
                setFiles(res.data['files'])
                setFolders(res.data['folders'])

            } catch (e) {
                setFetchContentsError(e)
            } finally {
                setLoadingContents(false)
                setFetchContentsError('')
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
            setFetchContentsError,
            root,
            setRoot
        }}>
            {children}
        </FileContext.Provider>
    )
}

export {FileContext, FileProvider}