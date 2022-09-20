import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import StudentManagement from './pages/StudentManagement'
import DefaultLayout from './layouts/DefaultLayout';
import AddStudent from './pages/AddStudent';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path="/" element={<DefaultLayout />}>
                        <Route index element={<StudentManagement />} />
                        <Route path='add-student' element={<AddStudent />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
