import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import folderIcon from "../assets/folder-icon.svg"
import fileIcon from "../assets/file-icon.svg"


export default function MediaCard({mediaItem}) {

    const icon = mediaItem.thumbnail ? mediaItem.thumbnail : fileIcon;

    return (

        <Link to={`/files/${mediaItem.id}`}>
            <div
                className={"flex flex-col border-2 border-solid border-emerald-950 rounded-lg p-4 hover:cursor-pointer h-[10rem] w-[10rem] text-emerald-50 bg-emerald-700 shadow-emerald-sd items-center justify-center gap-2"}>
                {mediaItem.type === "folder" ?
                    <img className={"flex w-[4rem] h-[4rem]"} src={folderIcon} alt={"folder-icon"}/> :
                    <img className={"flex w-[4rem] h-[4rem] "} src={icon} alt={"file-icon"}/>}
                <p>{mediaItem.name}</p>
            </div>
        </Link>
    )
}

MediaCard.propTypes = {
    mediaItem: PropTypes.shape({
        id: PropTypes.number.isRequired,
        path: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        thumbnail: PropTypes.any
    }).isRequired,
};