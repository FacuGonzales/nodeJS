const EXPRESS = require('express');

const app = EXPRESS();

const ProductRoutes = require('./routes/productos');

app.set("view engine", "pug")
app.set("views", "./views")

app.use(EXPRESS.json())
app.use(EXPRESS.urlencoded({extended : true}))
app.use(EXPRESS.static('public'))

app.use('/api', ProductRoutes);

app.get('/',(req,res)=>{
    res.render("new",{
        url: "/api/productos",
        method: "post",
        button: "Crear producto"
    })
})

module.exports = app;