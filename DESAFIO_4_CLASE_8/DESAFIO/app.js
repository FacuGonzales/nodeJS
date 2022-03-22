const EXPRESS = require('express');

const app = EXPRESS();

const ProductRoutes = require('./routes/productos');

app.use(EXPRESS.json())
app.use(EXPRESS.urlencoded({extended : true}))
app.use(EXPRESS.static('public'))

app.use('/api', ProductRoutes);

module.exports = app;