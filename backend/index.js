import express from 'express' 
import cors from 'cors' 
import authentication from './src/middleware/Authentication.js';
// import candidateRoutes from './routes/candidateRoutes'

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(authentication)

app.post('/', (req, res) => {
    console.log(req.user)
    res.send(req.user);
});

app.get('/', (req, res) => {
    res.send("<h1>Backend Running<h1>");
});

// app.use(candidateRoutes);

app.listen(5002, () => {
    console.log('Server is running on port 5002');
})