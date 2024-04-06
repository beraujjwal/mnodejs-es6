'use strict'
import 'dotenv/config';
import http from 'http'
import { Server } from 'socket.io';
import { socket } from './socket/index'

const log = console.log;
const error = console.error;

import app from './system';

const PORT = +process.env.APP_PORT || 3000
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  transports: ["websocket", "polling"],
  upgrade: false,
  maxHttpBufferSize: 1e8, // 100 MB we can upload to server (By Default = 1MB)
  pingTimeout: 60000, // increate the ping timeout
  cors: {
    origin:"http://localhost:3001",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTION"]
  },
});

socket(io);

httpServer
  .listen(PORT)
  .on('error', err => {
    error('✘ Application failed to start')
    error(`✘ Error: ${err.message}`)
    process.exit(0)
  })
  .on('listening', () => {
    log('✔ Application Started')
  })

