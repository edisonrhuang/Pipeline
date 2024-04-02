const express = require('express');
const cors = require('cors');
require('dotenv').config();
const candidateRoutes = require('./src/routes/candidateRoutes');

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Backend Running<h1>");
});

app.use(candidateRoutes);

app.listen(5002, () => {
    console.log('Server is running on port 5002');
});