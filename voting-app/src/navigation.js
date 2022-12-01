import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from './Pages/Login/login';
import Vote from './Pages/Vote/vote';
import MyVote from './Pages/MyVote/my-vote';
import Results from './Pages/Results/results';
import * as routes from './Constants/routes';

function NAVIGATION() {
    return <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login />} />
        <Route path={routes.VOTE} element={<Vote />} />
        <Route path={routes.MYVOTE} element={<MyVote />} />
        <Route path={routes.RESULTS} element={<Results />} />
    </Routes>
}

export default NAVIGATION