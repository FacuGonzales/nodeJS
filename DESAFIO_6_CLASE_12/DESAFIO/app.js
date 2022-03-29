const EXPRESS = require('express');
const {engine} = require('express-handlebars');

const { createServer } = require('http');
const { Server } = require('socket.io');


let messages = [];

const app = EXPRESS();
const HTTPServer = createServer(app);
const io = new Server(HTTPServer);

const ProductRoutes = require('./routes/productos');

app.engine("hbs",
engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: "./views/layouts",
        partialsDir:  "./views/partials"
    })
)

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(EXPRESS.json());
app.use(EXPRESS.urlencoded({extended : true}));
app.use(EXPRESS.static('public'));

app.use('/api', ProductRoutes);

app.get('/',(req,res)=>{
    res.render("main",{
        url: "/api/productos",
        method: "post",
        button: "Crear producto"
    });
});

//Websockets

// io.on("connection", (socket)=>{
//     console.log("user connected. ID:",socket.id)
//     socket.emit("message", "connected to websocket")
//     products.index()
//     .then(response =>{
//         socket.emit("products", response)
//     })
//     socket.emit("chat", messages)

//     socket.on("sendMessage", data =>{
//         messages.push(data)
//         io.sockets.emit("newMessage",data)
//     })
    
//     socket.on("receivedMessage", data =>{
        
//     })
// })

io.on("connection", (socket) => {

    console.log(`Conexión establecida - usuario: ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`Usuario ${socket.id} desconectado`);
    });
  
    //--> envio al cliente
    socket.emit("mensajes", mensajes);
    socket.emit("productos", articulos);
    //<--
  
    //--> recibo del cliente
    socket.on("producto", async (data) => {
      articulos.push(data);
      await fs.promises.writeFile('./public/txt/productos.txt', JSON.stringify(articulos))
      io.sockets.emit("productos", articulos);
    });
    socket.on("mensaje", async (data) => {
      mensajes.push({ email: data.email, fyh: data.fyh, mensaje: data.msj });
      await fs.promises.writeFile('./public/txt/mensajes.txt', JSON.stringify(mensajes))
      io.sockets.emit("mensajes", mensajes);
    });
    //<--
  
  });


module.exports = app;