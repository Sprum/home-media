import {Link} from "react-router-dom";

export default function Header() {

    return (
        <div
            className={"flex min-h-[5rem] border-teal-950 bg-teal-900 border-solid border-2 items-center justify-center shadow-teal-sd"}>
            <Link className={"text-teal-50 flex "} to={"/"}>Home Media</Link>
        </div>
    )
}