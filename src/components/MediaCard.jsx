import PropTypes from "prop-types";

export default function MediaCard({mediaItem}) {

    return (
        <div
            className={"flex flex-col border-2 border-solid border-teal-950 rounded-lg p-4 hover:cursor-pointer h-[8rem] w-[8rem] text-teal-50 bg-teal-700 shadow-teal-sd"}>
            <p>{mediaItem.id}</p>
            <p>{mediaItem.path}</p>
            <p>{mediaItem.type}</p>
        </div>
    )
}

MediaCard.propTypes = {
    mediaItem: PropTypes.shape({
        id: PropTypes.number.isRequired,
        path: PropTypes.string,
        type: PropTypes.string,
    }).isRequired,
};