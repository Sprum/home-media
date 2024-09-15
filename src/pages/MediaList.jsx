import MediaCard from "../components/MediaCard.jsx";
import useApi from "../api/api.js";
import {useContext, useEffect, useState} from "react";
import {FileContext} from "../context/FileContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
const media = [
    {id: 1, path: "/somePic.jpg", type: "picture"},
    {id: 2, path: "/someVid.avi", type: "video"},
    {id: 3, path: "/someFolder", type: "folder"},
    {id: 4, path: "/someSong", type: "song"},

]

export default function MediaList() {

    const {files, folders, loadingContents, fetchContentsError} = useContext(FileContext)


    return (
        <div className={"flex flex-col bg-emerald-50 flex-grow items-center"}>
            {loadingContents ?
                <LoadingSpinner/> :
                <>
                    <h1 className={"font-bold text-2xl text-emerald-900  mt-4"}>Your media:</h1>

                    <div><h1 className={"font-bold text-xl text-emerald-900  mt-4"}>Folders:</h1>
                        <div className={"flex flex-row gap-4 flex-wrap m-2"}>
                            {folders.map((m) => (

                                <MediaCard mediaItem={m} key={m.id}/>
                            ))}
                        </div>
                    </div>

                    <div><h1 className={"font-bold text-xl text-emerald-900  mt-4"}>Files:</h1>
                        <div className={"flex flex-row gap-4 flex-wrap m-2"}>
                            {files.map((m) => (
                                <MediaCard mediaItem={m} key={m.id}/>
                            ))}
                        </div>
                    </div>
                </>
            }
            {fetchContentsError ? <p className={"text-red-700"}>{fetchContentsError}</p> : <></>}
        </div>
    )
}