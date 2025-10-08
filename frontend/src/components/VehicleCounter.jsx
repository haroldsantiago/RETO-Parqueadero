import React from 'react';
import '../styles/VehicleCounter.css';

const VehicleCounter = ({ vehicles }) => {
  // Filtrar vehículos por tipo
  const cars = vehicles.filter(v => v.type === 'car' && !v.exitTime).length;
  const motorcycles = vehicles.filter(v => v.type === 'motorcycle' && !v.exitTime).length;
  const trucks = vehicles.filter(v => v.type === 'truck' && !v.exitTime).length;
  const total = cars + motorcycles + trucks;

  return (
    <div className="vehicle-counter-container">
      <h3 className="counter-title">Vehículos en el Parqueadero</h3>
      <div className="counters-grid">
        <div className="counter-item">
          <div className="counter-icon car-icon">🚗</div>
          <div className="counter-value">{cars}</div>
          <div className="counter-label">Automóviles</div>
        </div>
        <div className="counter-item">
          <div className="counter-icon motorcycle-icon">🏍️</div>
          <div className="counter-value">{motorcycles}</div>
          <div className="counter-label">Motocicletas</div>
        </div>
        <div className="counter-item">
          <div className="counter-icon truck-icon">🚚</div>
          <div className="counter-value">{trucks}</div>
          <div className="counter-label">Camiones</div>
        </div>
      </div>
      <div className="total-counter">
        <strong>Total:</strong> {total}
      </div>
    </div>
  );
};

export default VehicleCounter;