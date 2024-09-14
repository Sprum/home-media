import PropTypes from "prop-types";

export default function MediaCard({mediaItem}) {

    return (
        <div
            className={"flex flex-col border-2 border-solid border-emerald-950 rounded-lg p-4 hover:cursor-pointer h-[8rem] w-[8rem] text-emerald-50 bg-emerald-700 shadow-emerald-sd"}>
            <p>{mediaItem}</p>
        </div>
    )
}

// MediaCard.propTypes = {
//     mediaItem: PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         path: PropTypes.string,
//         type: PropTypes.string,
//     }).isRequired,
// };