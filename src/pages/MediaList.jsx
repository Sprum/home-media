import MediaCard from "../components/MediaCard.jsx";
import useApi from "../api/api.js";
import {useEffect, useState} from "react";

const media = [
    {id: 1, path: "/somePic.jpg", type: "picture"},
    {id: 2, path: "/someVid.avi", type: "video"},
    {id: 3, path: "/someFolder", type: "folder"},
    {id: 4, path: "/someSong", type: "song"},

]

export default function MediaList() {
    const api = useApi()

    const [files, setFiles] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await api.get("/list");
                setFiles(res.data); // Update state with the response data
            } catch (e) {
                console.error("Error fetching files:", e);
                setError("Failed to fetch files."); // Handle errors
            } finally {
                setLoading(false); // Ensure loading state is updated
            }
        };

        fetchFiles(); // Call the async function
    }, [api]); // Include `api` in the dependency array if needed
    return (
        <div className={"flex flex-col bg-emerald-50 flex-grow items-center"}>
            <h1 className={"font-bold text-xl text-emerald-900  mt-4"}>Your media:</h1>
            <div className={"flex flex-row gap-4 flex-wrap m-2"}>
                {files.map((m) => (
                    <MediaCard mediaItem={m} key={m.id}/>
                ))}
            </div>
        </div>
    )
}