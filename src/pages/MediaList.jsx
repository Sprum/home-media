import MediaCard from "../components/MediaCard.jsx";
import {useContext} from "react";
import {FileContext} from "../context/FileContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function MediaList() {

    const {files, folders, loadingContents, fetchContentsError, root} = useContext(FileContext)

    const stripRoot = (path)=>{
        return path.slice(root.length)
    }

    // TODO: filter by folder and keep track of current dir

    return (
        <div className={"flex flex-col bg-emerald-50 flex-grow items-center"}>
            {loadingContents ?
                <LoadingSpinner/> :
                <>
                    <h1 className={"font-bold text-2xl text-emerald-900  mt-4"}>Your media:</h1>
                    <div>
                        <p>{root}</p>
                    </div>
                    <div><h1 className={"font-bold text-xl text-emerald-900  mt-4"}>Folders:</h1>
                        <div className={"flex flex-row gap-4 flex-wrap m-2"}>
                            {folders.map((f, idx) => {
                                const folder = {id: idx, path: f, name:stripRoot(f), type: "folder"};
                                return (<MediaCard mediaItem={folder} key={folder.id}/>)
                            })
                            }
                        </div>
                    </div>

                    <div><h1 className={"font-bold text-xl text-emerald-900  mt-4"}>Files:</h1>
                        <div className={"flex flex-row gap-4 flex-wrap m-2"}>
                            {files.map((f, idx) => {
                                const file = {id: idx, path:f, name:stripRoot(f), type: "file"}
                                return (<MediaCard mediaItem={file} key={file.id}/>)
                            })}
                        </div>
                    </div>
                </>
            }
            {fetchContentsError ? <p className={"text-red-700"}>{fetchContentsError.message}</p> : <></>}
        </div>
    )
}