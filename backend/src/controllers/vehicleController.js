const Vehicle = require('../models/Vehicle');

// Controlador para gestionar vehículos
const vehicleController = {
  // Obtener todos los vehículos
  getAllVehicles: (req, res) => {
    try {
      const vehicles = Vehicle.getAll();
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener vehículos', error: error.message });
    }
  },

  // Obtener un vehículo por ID
  getVehicleById: (req, res) => {
    try {
      const vehicle = Vehicle.getById(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener vehículo', error: error.message });
    }
  },

  // Crear un nuevo vehículo (entrada al parqueadero)
  createVehicle: (req, res) => {
    try {
      const newVehicle = Vehicle.create(req.body);
      res.status(201).json(newVehicle);
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar vehículo', error: error.message });
    }
  },

  // Actualizar un vehículo (salida del parqueadero)
  updateVehicle: (req, res) => {
    try {
      const updatedVehicle = Vehicle.update(req.params.id, req.body);
      if (!updatedVehicle) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      res.status(200).json(updatedVehicle);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar vehículo', error: error.message });
    }
  },

  // Eliminar un vehículo
  deleteVehicle: (req, res) => {
    try {
      const deleted = Vehicle.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      res.status(200).json({ message: 'Vehículo eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar vehículo', error: error.message });
    }
  }
};

module.exports = vehicleController;