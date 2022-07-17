import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import apiRouter from "./routes/indexRoutes.js";
import { connectMongoDB } from "./config/configMongoDB.js";
import websockets from "./config/websockets.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "dotenv/config";
import "./config/passport-local.js";
const app = express();
const PORT = 8080;

/** Tenemos dos servidores:  httpServer y ioServer */
const httpServer = http.createServer(app);

/** Crear nuevo servidor websocket */
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function onInit() {
  console.log("Iniciando App...");
}

/** ★━━━━━━━━━━━★ middlewares ★━━━━━━━━━━━★*/
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  })
);
//** session */
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.cyfup.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      ttl: 60 * 10, // 10 minutes
    }),
  })
);
/** passport  */
app.use(passport.initialize()); // Inicializa passport
app.use(passport.session()); // Enlaza passport con la sesion

/** ★━━━━━━━━━━━★ routes ★━━━━━━━━━━━★*/
app.use("/api", apiRouter);

/** ★━━━━━━━━━━━★ websockets ★━━━━━━━━━━━★*/
websockets(io);

/** ★━━━━━━━━━━━★ connection mongoDB ★━━━━━━━━━━━★ */
connectMongoDB();

/** ★━━━━━━━━━━━★ connection server ★━━━━━━━━━━━★ */

try {
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.log("Error de conexión con el servidor...", error);
}

onInit();
