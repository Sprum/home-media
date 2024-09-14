import {Link} from "react-router-dom";

export default function Header() {

    return (
        <div
            className={"flex min-h-[5rem] border-emerald-950 bg-emerald-900 border-solid border-2 items-center justify-center shadow-emerald-sd"}>
            <Link className={"text-emerald-50 flex "} to={"/"}>Home Media</Link>
        </div>
    )
}