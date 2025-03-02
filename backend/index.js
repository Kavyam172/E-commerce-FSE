const express = require('express');
const dbConnection = require('./config/dbConnect');
const productRoutes = require('./routes/products');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add routes
app.use('/products', productRoutes);
app.use('/users', require('./routes/user'));
app.use('/orders', require('./routes/orders'));
app.use('/customers', require('./routes/customers'));
app.use('/categories', require('./routes/categories'));
app.use('/auth', require('./routes/auth'));
app.use('/cart', require('./routes/cart'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});