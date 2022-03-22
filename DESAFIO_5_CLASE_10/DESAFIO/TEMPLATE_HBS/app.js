const EXPRESS = require('express');
const {engine} = require('express-handlebars');

const app = EXPRESS();

const ProductRoutes = require('./routes/productos');

app.engine("hbs",
engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: "./views/layouts",
        partialsDir:  "./views/partials"
    })
)

app.set("view engine", "hbs")
app.set("views", "./views")
app.use(EXPRESS.json())
app.use(EXPRESS.urlencoded({extended : true}))
app.use(EXPRESS.static('public'))

app.use('/api', ProductRoutes);

app.get('/',(req,res)=>{
    res.render("main",{
        url: "/api/productos",
        method: "post",
        button: "Crear producto"
    })
})

module.exports = app;