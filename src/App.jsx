import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { SocketContext } from "./context/SocketContext";
import { UserContext } from './context/UserContext'
import Signup from './pages/Signup';
import MainLayout from './Layouts/MainLayout';


function App() {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SocketContext.Provider value={{ socket, setSocket }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<MainLayout />} />
            <Route path="/admin" element={<Signup permission="admin" />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </UserContext.Provider>
  )
}

export default App
