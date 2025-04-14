const express = require('express');
const dbConnection = require('./config/dbConnect');
const productRoutes = require('./routes/products');
const cookieParser = require('cookie-parser');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// add routes
app.use('/products', productRoutes);
app.use('/users', require('./routes/user'));
app.use('/orders', require('./routes/order'));
app.use('/auth', require('./routes/auth'));
app.use('/cart',require('./routes/cart'))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, (err) => {
    if(err) {
        console.log('Error starting server:', err);
        return;
    }
    console.log('Server is running on port 3000');
});