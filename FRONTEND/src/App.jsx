import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Adopciones from './pages/Adopciones';
import CasosExito from './pages/CasosExito';
import Login from './pages/Login';
import SolicitudAdopcion from './pages/SolicitudAdopcion';
import './App.css';

import Tienda from './components/Tienda';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopciones" element={<Adopciones />} />
        <Route path="/casos-exito" element={<CasosExito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solicitud-adopcion/:id" element={<SolicitudAdopcion />} />
        <Route path="/tienda" element={<Tienda />} />
      </Routes>
    </Router>
  );
}
export default App;