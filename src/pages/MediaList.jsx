import MediaCard from "../components/MediaCard.jsx";
import {useContext, useEffect, useState} from "react";
import {FileContext} from "../context/FileContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import {filterMediaFromArray} from "../util/util.js";
import {ApiContext} from "../context/ApiContext.jsx";

export default function MediaList() {
    const [receivedThumbnails, setReceivedThumbnails] = useState(false)
    const [isReceivingThumbnails, setIsReceivingThumbnails] = useState(false)
    const {files, setFiles, folders, loadingContents, fetchContentsError, root} = useContext(FileContext)
    const {baseUrl} = useContext(ApiContext)
    const stripRoot = (path) => {
        return path.slice(root.length)
    }
    const base64ToBlob = (base64, contentType) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };

    // TODO: filter by folder and keep track of current dir
    useEffect(() => {
        const fetchThumbnails = async () => {
            const filesToGet = filterMediaFromArray(files);
            const ids = filesToGet.map(f => f.id);
            const body = JSON.stringify({fileIds: ids});
            setIsReceivingThumbnails(true)
            try {
                const res = await fetch(`${baseUrl}/api/v1/thumbnails`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body
                });

                const reader = res.body.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const {done, value} = await reader.read();

                    if (done) {
                        console.log("Stream complete");
                        break;
                    }

                    const chunk = decoder.decode(value, {stream: true});
                    const batchData = JSON.parse(chunk);

                    setFiles((prevFiles) =>
                        prevFiles.map((file) => {
                            const thumbnailItem = batchData.find(item => item.id === file.id);
                            if (thumbnailItem) {
                                const blob = base64ToBlob(thumbnailItem.data, 'image/jpeg');
                                const objectUrl = URL.createObjectURL(blob);

                                return {...file, thumbnail: objectUrl};
                            }
                            return file;
                        })
                    );
                }
            } catch (e) {
                console.log(e.message);
            } finally {
                setIsReceivingThumbnails(false)
                setReceivedThumbnails(true)
            }
        };

        if (!receivedThumbnails && !isReceivingThumbnails) {
            fetchThumbnails();
        }
    }, [receivedThumbnails]);

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
                        {folders && (<div className={"flex flex-row gap-4 flex-wrap m-2"}>
                            {folders.map((f, idx) => {
                                const folder = {id: idx, path: f, name: stripRoot(f), type: "folder"};
                                return (<MediaCard mediaItem={folder} key={folder.id}/>)
                            })
                            }
                        </div>)}
                    </div>

                    <div><h1 className={"font-bold text-xl text-emerald-900  mt-4"}>Files:</h1>
                        {files && (<div className={"flex flex-row gap-4 flex-wrap m-2"}>
                            {files.map((file) => {
                                return (<MediaCard mediaItem={file} key={file.id}/>)
                            })}
                        </div>)}
                    </div>
                </>
            }
            {fetchContentsError ? <p className={"text-red-700"}>{fetchContentsError.message}</p> : <></>}
        </div>
    )
}