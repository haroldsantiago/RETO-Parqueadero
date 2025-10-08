const express = require('express');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API del Sistema de Parqueadero' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});