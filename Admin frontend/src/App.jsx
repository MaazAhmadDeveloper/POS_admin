import react from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import 'antd/dist/antd.min.css';
import Home from "./Components/pages/home/Home";
import Users from "./Components/pages/users/Users";


function App() {
    return <div>
            <Router>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/users" element={ <Users /> } />
                </Routes>
            </Router>
    </div>
};

export default App;