// Simulamos una base de datos en memoria
let vehicles = [];
let nextId = 1;

class Vehicle {
  static getAll() {
    return vehicles;
  }

  static getById(id) {
    return vehicles.find(vehicle => vehicle.id === parseInt(id));
  }

  static create(vehicleData) {
    const newVehicle = {
      id: nextId++,
      plate: vehicleData.plate,
      type: vehicleData.type,
      entryTime: vehicleData.entryTime || new Date(),
      exitTime: null,
      ...vehicleData
    };
    vehicles.push(newVehicle);
    return newVehicle;
  }

  static update(id, vehicleData) {
    const index = vehicles.findIndex(vehicle => vehicle.id === parseInt(id));
    if (index === -1) return null;
    
    vehicles[index] = { ...vehicles[index], ...vehicleData };
    return vehicles[index];
  }

  static delete(id) {
    const index = vehicles.findIndex(vehicle => vehicle.id === parseInt(id));
    if (index === -1) return false;
    
    vehicles.splice(index, 1);
    return true;
  }
}

module.exports = Vehicle;