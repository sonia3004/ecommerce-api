const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const productsRouter = require('./routes/products');

// middleware CORS
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/ecommerce', {});

// Événements de connexion
const db = mongoose.connection;
db.on('error', (error) => console.error('Erreur de connexion à MongoDB:', error));
db.once('open', () => console.log('Connecté à la base de données'));

// Middleware
app.use(express.json()); // parser le JSON dans les requêtes

// Servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productsRouter); 

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));
