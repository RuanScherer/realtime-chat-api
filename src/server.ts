import app from './App'
import { Socket } from 'socket.io';
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket: Socket) => {
	socket.emit("loadOldMessages")
	socket.on('newMessage', message => {
		socket.broadcast.emit('loadNewMessage', message)
	})
});

http.listen(3333, () => console.log("App listening on port 3333"))