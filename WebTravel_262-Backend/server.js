const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());


app.use(express.json()); 
app.use(express.static(__dirname + "./photos"));

const multer = require('multer');
const path = require('path');

const MIME_TYPE_MAP = {  
  'image/png': 'png',  
  'image/jpeg': 'jpg',  
  'image/jpg': 'jpg'  
};  

app.get('/photos/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'photos', filename);
  const ext = path.extname(filename).toLowerCase();
  const contentType = MIME_TYPE_MAP[ext] || 'image/png'; 
  res.set('Content-Type', contentType);
  res.sendFile(imagePath);
});

app.use(express.static('public', {
  setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
          res.setHeader('Content-Type', 'text/html');
      } else if (path.endsWith('.json')) {
          res.setHeader('Content-Type', 'application/json');
      } else if (path.endsWith('.xml')) {
          res.setHeader('Content-Type', 'text/xml');
      }
  }
}));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];  
      let error = new Error("Invalid Mime Type");  
      if(isValid){  
        error = null;  
      }  
      cb(null, './photos');
    },
    filename: (req, file, cb) => {
     const originalName = file.originalname.toLowerCase();
     const filePath = originalName.replace(/\\/g, '/');
     const nameWithoutSpaces = filePath.replace(/\s+/g, '_');
     const ext = path.extname(originalName);
     const filename = nameWithoutSpaces;
     cb(null, filename);
    }
});


app.post('/photo', multer({ storage: storage }).single('image'), (req, res) => {
  const imagePath = req.file.path.replace(/\\/g, '/');
  res.status(200).json({ imagePath: imagePath });
});


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ferhatovicmedina21:medina@cluster0.p2o89us.mongodb.net/dbtravel_262').then(() => console.log("Database Connected!")).catch((error) => console.log(error));


const destController = require('./src/controllers/destinations.controller').controller;
const userController = require('./src/controllers/users.controller').controller;
const bookingController = require('./src/controllers/bookings.controller').controller;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE, HEAD, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(destController);
app.use(userController);
app.use(bookingController);
app.listen(3000, () => console.log("Server connected on Port 3000!"));
