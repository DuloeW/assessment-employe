import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dasboard from './pages/Dasboard';
import AssessEmployee from './pages/AssessEmployee';
import AddEmployee from './pages/AddEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import InfoAdmin from './pages/InfoAdmin';
import PrivateRoutes from './util/PrivateRoutes';
import Login from './pages/Login';
import './css/Dasboard.css'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Dasboard />} path="/" exact />
                        <Route element={<AssessEmployee/>} path="/assess-employee" />
                        <Route element={<AddEmployee/>} path='/add-employee' />
                        <Route element={<UpdateEmployee/>} path='/update-employee/:employeeId' />
                        <Route element={<InfoAdmin/>} path='/admin-info' />
                    </Route>
                    <Route element={<Login/>} path="/login" />
                </Routes>
            </Router>
        </div>
    );
}

export default App;