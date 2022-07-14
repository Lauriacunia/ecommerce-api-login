import express from 'express';
import morgan from 'morgan';
import { Server } from "socket.io";
import http from 'http';
import cors from 'cors';
import apiRouter from './routes/indexRoutes.js';
import { connectMongoDB } from './config/configMongoDB.js';
import websockets from './config/websockets.js';
const app = express();
const PORT = 8080;
// const chat = {
//     id: '30950',
//     nombre: 'Canal de chat - Comisión 30950',
//     mensajes: [] // contiene un array de mensajes
// }

const mensajes = [];


/** Tenemos dos servidores:  httpServer y ioServer */
const httpServer = http.createServer(app);

/** Crear nuevo servidor websocket */
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
         }
});


//** Middlewares */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {
       origin: '*',
       methods: 'GET, POST, PUT, DELETE, OPTIONS',
    }
));


/** Routes */
app.use('/api', apiRouter);


function onInit() {
    console.log('Iniciando App...');
}
/** ★━━━━━━━━━━━★ NORMALIZR ★━━━━━━━━━━━★*/

// function print(obj){
//     console.log(inspect(obj, { depth: null }));
// }

/** Definir schema autor */

//const autorSchema = new schema.Entity('autores');

/** Definir schema mensaje */

// const mensajeSchema = new schema.Entity('mensajes', {
//   id: { type: String },
//   autor: autorSchema,
//   texto: '',
//   timestamp: { type: Number }
// });

// const chatSchema = new schema.Entity('chats', {
//   id: { type: String },
//   mensajes: [mensajeSchema]
// });


// const normalizeChat = (chat) => {
//     return normalize(chat, chatSchema);
// }

/** ★━━━━━━━━━━━★ WEBSOCKET ★━━━━━━━━━━━★*/
websockets(io);

/** ★━━━━━━━━━━━★ CONNECTION MONGO DB ★━━━━━━━━━━━★ */
connectMongoDB();

/** ★━━━━━━━━━━━★ CONNECTION SERVER ★━━━━━━━━━━━★ */

try {
    httpServer.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}

onInit();
