const path = require('path');

const sendFile = (resp, file) => {
	console.log('sending file', file);
	resp.sendFile(path.resolve(__dirname, '..', 'public', file));
}

module.exports = {
	sendFile,
}