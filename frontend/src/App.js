import {BrowserRouter, Route, Routes} from "react-router-dom";
import SubmitFeedback from "./Pages/SubmitFeedback";
import AllFeedback from "./Pages/AllFeedback";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact index element = {<SubmitFeedback/>}  />
                    <Route exact path='/' element = {<SubmitFeedback/>}  />
                    <Route exact path='/all-feedback' element = {<AllFeedback/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
