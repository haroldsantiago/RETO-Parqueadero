import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/VehicleList.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles');
      setVehicles(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error al cargar los vehículos');
      setLoading(false);
      console.error(error);
    }
  };

  const handleExit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/vehicles/${id}`, {
        exitTime: new Date()
      });
      fetchVehicles();
    } catch (error) {
      setError('Error al registrar salida');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este registro?')) {
      try {
        await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
        fetchVehicles();
      } catch (error) {
        setError('Error al eliminar vehículo');
        console.error(error);
      }
    }
  };

  const getVehicleType = (type) => {
    switch (type) {
      case 'car': return 'Automóvil';
      case 'motorcycle': return 'Motocicleta';
      case 'truck': return 'Camión';
      default: return type;
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  return (
    <div className="vehicle-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/')}
        >
          ← Regresar al Registro
        </button>
        <h2 className="text-center mb-0">Vehículos en el Parqueadero</h2>
        <div style={{width: '120px'}}></div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {vehicles.length === 0 ? (
        <div className="alert alert-info">No hay vehículos registrados en el parqueadero</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Placa</th>
                <th>Tipo</th>
                <th>Hora de Entrada</th>
                <th>Hora de Salida</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.ownerFirstName || '-'}</td>
                  <td>{vehicle.ownerLastName || '-'}</td>
                  <td>{vehicle.plate}</td>
                  <td>{getVehicleType(vehicle.type)}</td>
                  <td>{new Date(vehicle.entryTime).toLocaleString()}</td>
                  <td>
                    {vehicle.exitTime 
                      ? new Date(vehicle.exitTime).toLocaleString() 
                      : 'En parqueadero'}
                  </td>
                  <td>
                    {!vehicle.exitTime && (
                      <button 
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleExit(vehicle.id)}
                      >
                        Registrar Salida
                      </button>
                    )}
                    <button 
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VehicleList;