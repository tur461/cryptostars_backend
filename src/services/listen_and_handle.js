const http = require('http');
const io = require('socket.io')();
const UserMgmt = require("./user_mgmt");
const { cLog, Arr } = require("./utils");
const { logIfaceInfo, sendErr, sendFile } = require('./helpers');
const { EVENT, PORT, ERR_TYPE, WHITE_FILES } = require("./constants");

const newConnectionCbk = socket => {
	const uname = socket.handshake.query.username;
	
	const connectedCbk = msg =>  {
		cLog('connected: ' + uname,  'ID: ' + socket.id);
		cLog(`# of users added so far: ${UserMgmt.addUser(uname, socket.id)}`);
	};

	const newMsgCbk = msg =>  {
		io.emit('newMessage', msg);
	};

	const sockConnectErrCbk = msg => {
		cLog('error:', msg);
		setTimeout(() => {
			socket.connect();
		}, 1000);
	}

	const disconnectedCbk = m => {
		cLog('disconnected msg:', m);
		cLog(`User ${uname} removed at index: ${UserMgmt.delUser(socket.id)}`);
	}

	socket.on(EVENT.SOCK.NEW_MSG, newMsgCbk);
	socket.on(EVENT.SOCK.ERR, sockConnectErrCbk);
	socket.on(EVENT.SOCK.CONNECTED, connectedCbk);
	socket.on(EVENT.SOCK.DISCONNECTED, disconnectedCbk);
}

const reconCbk = () => {
	cLog('reconnection..');
}

const reconAtmptCbk = () => {
	cLog('reconnection attempt..');
}

io.sockets.on(EVENT.SOCK_IO.RECONNECT, reconCbk);
io.sockets.on(EVENT.SOCK_IO.RECON_ATTEMPT, reconAtmptCbk);
io.sockets.on(EVENT.SOCK_IO.NEW_CONNECTION, newConnectionCbk);

function startServer() {
	const server = http.createServer((req, resp) => {
		if(Arr.any(WHITE_FILES, req.url)) sendFile(resp, req.url) 
			else sendErr(resp, ERR_TYPE.INVALID_URL);
	});
	
	cLog(`Port: ${PORT}`);
	
	logIfaceInfo();
	
	server.listen(PORT);
	io.listen(server);
}

module.exports = {
	startServer,
}