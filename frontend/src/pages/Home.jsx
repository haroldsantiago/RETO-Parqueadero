import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VehicleCounter from '../components/VehicleCounter';
import '../styles/Home.css';

const Home = () => {
  const [vehicle, setVehicle] = useState({ 
    plate: '', 
    type: 'car',
    ownerFirstName: '',
    ownerLastName: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchVehicles();
  }, []);
  
  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
    }
  };

  const handleChange = (e) => {
    // Si el campo es "plate", convertir a mayúsculas
    const value = e.target.name === 'plate' ? e.target.value.toUpperCase() : e.target.value;
    setVehicle({ ...vehicle, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/vehicles', vehicle);
      setMessage('Vehículo registrado exitosamente');
      setVehicle({ 
        plate: '', 
        type: 'car',
        ownerFirstName: '',
        ownerLastName: ''
      });
      // Actualizar el contador después de registrar un vehículo
      fetchVehicles();
      setTimeout(() => navigate('/vehicles'), 2000);
    } catch (error) {
      setMessage('Error al registrar vehículo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Sección del formulario de registro */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Registro de Entrada</h2>
              {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                  {message}
                </div>
              )}
        
        {/* Sección del contador de vehículos */}
        
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ownerFirstName" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ownerFirstName"
                    name="ownerFirstName"
                    value={vehicle.ownerFirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ownerLastName" className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ownerLastName"
                    name="ownerLastName"
                    value={vehicle.ownerLastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="plate" className="form-label">Placa del Vehículo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="plate"
                    name="plate"
                    value={vehicle.plate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Tipo de Vehículo</label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={vehicle.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="car">Automóvil</option>
                    <option value="motorcycle">Motocicleta</option>
                    <option value="truck">Camión</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrar Entrada'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Sección del contador de vehículos */}
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Estado del Parqueadero</h2>
              <VehicleCounter vehicles={vehicles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;