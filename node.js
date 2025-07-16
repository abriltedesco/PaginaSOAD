const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5500;

// lee datos del form
app.use(bodyParser.urlencoded({ extended: true }));

// archivos HTML se carguen desde 'public'
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      
  password: '',      
  database: 'soadweb'
});

db.connect((err) => {
  if (err) {
    console.error('error al intentar conectar', err);
    return;
  }
  console.log('conectado a bdd');
});

// guarda al usuario
app.post('/registrar', (req, res) => {
  const { nombre, apellido, email } = req.body;

  const query = 'INSERT INTO usuarios (nombre, apellido, email) VALUES (?, ?, ?)';
  db.query(query, [nombre, apellido, email], (err, result) => {
    if (err) {
      console.error('Error al insertar:', err);
      res.status(500).send('Error al guardar');
    } else {
      res.send('Usuario registrado correctamente');
    }
  });
});

// servidor activo
app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});
