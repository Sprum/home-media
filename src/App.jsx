import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Index from "./pages/Index.jsx";
import MediaList from "./pages/MediaList.jsx";
import Header from "./components/Header.jsx";
import {ApiProvider} from "./context/ApiContext.jsx";

export default function App() {
    return (
        <ApiProvider>
            <Router>
                <>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route path="/contents" element={<MediaList/>}/>
                    </Routes>
                </>
            </Router>
        </ApiProvider>
    );
}
