const PORT = 8000;

const WHITE_FILES = [
	'/admin.html',
	'/client.html',
	'/js/admin.js',
	'/js/client.js',
	'/css/styles.common.css'
];

const BLACK_FILES = [

];

const F_TYPE = {
	JS: '.js',
	CSS: '.css',
	HTML: '.html',
	NONE: 'na.none',
}

const C_TYPE = {
	CSS: 'text/css',
	HTML: 'text/html',
	DEF: 'text/default',
	JS: 'text/javascript',
}

const ERR_TYPE = {
	INVALID_URL: 'Invalid URL/Method',
}

const EVENT = {
	SOCK: {
		ERR: 'connect-error',
		NEW_MSG: 'newMessage',
		CONNECTED: 'connected',
		DISCONNECTED: 'disconnect',
	},
	SOCK_IO: {
		RECONNECT: 'reconnect',
		RECON_ATTEMPT: 'reconnect_attempt',
		NEW_CONNECTION: 'connection',
	},
};

module.exports = {
    PORT,
    EVENT,
	C_TYPE,
    F_TYPE,
    ERR_TYPE,
    WHITE_FILES,
    BLACK_FILES,
}