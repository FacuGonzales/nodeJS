const EXPRESS = require('express');

const app = EXPRESS();

const ProductRoutes = require('./routes/products');
const CartRoutes = require('./routes/cart');



app.use(EXPRESS.json());
app.use(EXPRESS.urlencoded({extended : true}));
app.use(EXPRESS.static('public'));

app.use('/api', ProductRoutes);
app.use('/api/tuCompra', CartRoutes);


// app.get('/',(req,res)=>{
//     res.render("main",{
//         url: "/api/productos",
//         method: "post",
//         button: "Crear producto"
//     });
// });


module.exports = app;