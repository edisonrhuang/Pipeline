const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const candidateRoutes = require('./src/routes/candidateRoutes');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Backend Running<h1>");
});

app.use(candidateRoutes);

app.listen(5002, () => {
    console.log('Server is running on port 5002');
});