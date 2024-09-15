import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Index from "./pages/Index.jsx";
import MediaList from "./pages/MediaList.jsx";
import Header from "./components/Header.jsx";
import {ApiProvider} from "./context/ApiContext.jsx";
import MediaDetail from "./pages/MediaDetail.jsx";
import {FileProvider} from "./context/FileContext.jsx";

export default function App() {
    return (
        <ApiProvider>
            <FileProvider>
                <Router>
                    <>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Index/>}/>
                            <Route path="/contents" element={<MediaList/>}/>
                            <Route path={"/files"} element={<MediaDetail/>}/>
                        </Routes>
                    </>
                </Router>
            </FileProvider>
        </ApiProvider>
    );
}
