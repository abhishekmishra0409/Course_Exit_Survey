import {BrowserRouter, Route, Routes} from "react-router-dom";
import SubmitFeedback from "./Pages/SubmitFeedback";
import AllFeedback from "./Pages/AllFeedback";
import Login from "./Pages/Login";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact index element = {<SubmitFeedback/>}  />
                    <Route exact path='/' element = {<SubmitFeedback/>}  />
                    <Route exact path='/fhg5471hg651hj/all-feedback' element = {<AllFeedback/>} />
                    <Route exact path='/login' element = {<Login/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
