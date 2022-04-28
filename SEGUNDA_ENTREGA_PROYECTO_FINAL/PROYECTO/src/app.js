const EXPRESS = require('express');
const app = EXPRESS();

const ProductRoutes = require('./routes/products');
const CartRoutes = require('./routes/cart');



app.use(EXPRESS.json());
app.use(EXPRESS.urlencoded({extended : true}));

app.use('/api', ProductRoutes);
// app.use('/api/tuCompra', CartRoutes);


app.get('/health', (_req, res) => {
  res.send('Running 1');
});

module.exports = app;
