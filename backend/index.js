const express = require('express');
const dbConnection = require('./config/dbConnect');
const productRoutes = require('./routes/products');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add routes
app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});