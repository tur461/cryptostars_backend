const fs = require('fs');
const path = require('path');
const os = require('os');
const ifaces = os.networkInterfaces();
const { F_TYPE, C_TYPE } = require("./constants");
const { rEqual, cLog, contains } = require("./utils");

const logIfaceInfo = _ => {
	for (let a in ifaces)
		for (let b in ifaces[a]) {
			let addr = ifaces[a][b];
			if (
				rEqual('IPv4', addr.family) && 
				!addr.internal
			) cLog(`Network IP: ${addr.address}`);
		}
}

const fileType = f => {
	return contains(f, F_TYPE.JS) ? F_TYPE.JS : 
		contains(f, F_TYPE.CSS) ? F_TYPE.CSS :
		contains(f, F_TYPE.HTML) ? F_TYPE.HTML : 
		F_TYPE.NONE;
}

const sendFile = (resp, file) => {
	console.log('sending file', file);
	// let read = fs.createReadStream(`${__dirname}/../public${file}`);
	// read.pipe(resp);
	// let cType='';
	// switch(fileType(file)) {
	// 	default: cType = C_TYPE.DEF; break;
	// 	case F_TYPE.JS: cType = C_TYPE.JS; break;
	// 	case F_TYPE.CSS: cType = C_TYPE.CSS; break;
	// 	case F_TYPE.HTML: cType = C_TYPE.HTML; break;
	// }
	resp.sendFile(path.resolve(__dirname, '..', 'public', file));
}

const sendErr = (resp, type) => {
	resp.writeHead(400, type); 
	resp.end();
}

module.exports = {
	sendErr,
	sendFile,
	logIfaceInfo,
}