import {useContext, useState} from 'react';
import {ApiContext} from '../context/ApiContext';
import {Link} from "react-router-dom";
import useApi from "../api/api.js"; // Ensure correct path

export default function Index() {
    const {baseUrl, setBaseUrl, connected, setConnected} = useContext(ApiContext);
    const [newUrl, setNewUrl] = useState('');
    const [changeUrl, setChangeUrl] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false
    )
    const api = useApi()

    const pingServer = async () => {
        setIsConnecting(true)
        try {
            const res = await api.get("/ping")
            if (res.data['connected']) {
                setConnected(true)
            }
        } catch (e) {
            setConnected(false)
            console.log(e)
        } finally {
            setIsConnecting(false)
        }
    }

    const handleUrl = (e) => {
        e.preventDefault();

        pingServer()
        setBaseUrl(newUrl);
        setChangeUrl(false);
    };

    return (
        <div className="flex flex-col flex-grow">
            <div className="flex bg-emerald-50 flex-grow items-center flex-col">
                <h1 className="font-bold text-4xl text-emerald-900 mt-4">
                    Welcome to the Opensource Home Media System!
                </h1>


                <div className="m-4 p-2 text-emerald-900">
                    <h1 className="font-bold text-xl text-emerald-900 mt-4">
                        Settings:
                    </h1>
                    {!changeUrl ? (
                        <div className={"flex flex-row"}>
                            <div className={"flex flex-col"}>
                                <h3>Current URL in use:</h3>
                                <p>{baseUrl || 'No URL set'}</p>
                                <div className={"flex flex-col gap-2"}>
                                    <button
                                        onClick={() => setChangeUrl(true)}
                                        className="flex justify-center items-center bg-emerald-900 p-2 text-emerald-50 rounded-lg"
                                    >
                                        Change URL
                                    </button>
                                    <button
                                        onClick={pingServer}
                                        className="flex justify-center items-center bg-emerald-900 p-2 text-emerald-50 rounded-lg"
                                    >
                                        Connect!
                                    </button>
                                </div>
                            </div>
                            <svg width="50" height="150" xmlns="http://www.w3.org/2000/svg">
                                {/*Background Rectangle*/}
                                <rect x="5" y="5" width="40" height="140" rx="10" ry="10" fill="black"/>
                                {/*Red Light*/}
                                <circle id="redLight" cx="25" cy="30" r="15" fill={connected?"gray" :"red"}/>
                                {/*Yellow Light */}
                                <circle id="yellowLight" cx="25" cy="75" r="15" fill={isConnecting? "yellow":"gray"}/>
                                {/*Green Light*/}
                                <circle id="greenLight" cx="25" cy="120" r="15" fill={connected? "green":"gray"}/>
                            </svg>
                        </div>
                    ) : (
                        <div>
                            <form onSubmit={handleUrl} className="flex flex-col justify-start gap-2">
                                <label htmlFor="url">Specify the URL for your Server:</label>
                                <input
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    id="url"
                                    value={newUrl}
                                    type="text"
                                    className="bg-emerald-600 text-emerald-50 rounded-lg border-2 border-solid border-emerald-950"
                                    autoFocus={true}
                                />
                                <button
                                    type="submit"
                                    className="flex justify-center items-center bg-emerald-900 p-2 text-emerald-50 rounded-lg"
                                >
                                    Set URL
                                </button>
                            </form>
                            {connected ? <p>You are connected!</p> : <p>You are not Connected to the server.</p>}
                        </div>
                    )}
                </div>
                <div className="m-4 p-2 text-emerald-900">
                    <Link to={"/contents"}>
                        <h1 className="font-bold text-xl text-emerald-900 mt-4">
                            Browse your Media
                        </h1>
                    </Link>
                </div>

            </div>
        </div>
    );
}
