import MediaCard from "../components/MediaCard.jsx";

const media = [
    {id: 1, path: "/somePic.jpg", type: "picture"},
    {id: 2, path: "/someVid.avi", type: "video"},
    {id: 3, path: "/someFolder", type: "folder"},
    {id: 4, path: "/someSong", type: "song"},

]

export default function MediaList() {
    return (
        <div className={"flex flex-col bg-teal-50 flex-grow items-center"}>
            <h1 className={"font-bold text-xl text-teal-900  mt-4"}>Your media:</h1>
            <div className={"flex flex-row gap-4 flex-wrap m-2"}>
                {media.map((m) => (
                    <MediaCard mediaItem={m} key={m.id}/>
                ))}
            </div>
        </div>
    )
}