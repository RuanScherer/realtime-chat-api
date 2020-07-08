import express, { Request, Response } from 'express'
import { Socket } from 'socket.io';
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket: Socket) => {
	socket.emit("loadOldMessages")
});

http.listen(3333, () => console.log("App listening on port 3333"))