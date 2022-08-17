import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server as ServerIo } from "socket.io";
import { socketController } from "../sockets/controller.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = new ServerIo(this.server);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    // this.app.use( this.paths.auth, require('../routes/auth'));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

export { Server };
