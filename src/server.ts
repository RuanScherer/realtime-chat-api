import app from './App'
import { Socket } from 'socket.io';
var http = require('http').createServer(app);
var io = require('socket.io')(http);

interface ISocket extends Socket {
	username: string
}

var connectedSockets = []

io.on('connection', (socket: ISocket) => {
	socket.on('setUsername', username => {
		socket.username = username
		connectedSockets.push(socket)
	})

	socket.emit("loadOldMessages")

	socket.on('newMessage', data => {
		io.emit('loadNewMessage', data)
	})
})

http.listen(3333, () => console.log("App listening on port 3333"))