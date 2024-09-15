import { useContext, useState } from 'react';
import { ApiContext } from '../context/ApiContext';
import {Link} from "react-router-dom";
import useApi from "../api/api.js"; // Ensure correct path

export default function Index() {
    const { baseUrl, setBaseUrl, connected, setConnected} = useContext(ApiContext);
    const [newUrl, setNewUrl] = useState('');
    const [changeUrl, setChangeUrl] = useState(false);
    const api = useApi()

    const pingServer = async ()=>{
        try {
            const res = await api.get("/ping")
            if (res.data['connected']) {
                setConnected(true)
                console.log(connected)
            }
        } catch (e) {
            setConnected(false)
            console.log(e)
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
                        <div>
                            <h3>Current URL in use:</h3>
                            <p>{baseUrl || 'No URL set'}</p>
                            <button
                                onClick={() => setChangeUrl(true)}
                                className="flex justify-center items-center bg-emerald-900 p-2 text-emerald-50 rounded-lg"
                            >
                                Change URL
                            </button>
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
                            {connected? <p>You are connected!</p>:<p>You are not Connected to the server.</p>}
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
