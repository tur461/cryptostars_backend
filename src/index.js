const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
const { sendFile } = require('./services/helpers.js');
const API_HANDLER = require('./services/api_handlers.js');
const { ROUTE, PORT } = require('./services/constants.js');

const corsOpts = {
	origin: '*',
}

const app = express();

// app.all('*', function (req, res, next) {
// 	console.log('request:', req.originalUrl);
// 	console.log('request:', req.body);
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// 	next();
// });

// express plugins and extensions

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: !1 }));

app.options('*', cors(corsOpts))

// => Admin panel

app.get(ROUTE.ADMIN_PANEL, (_, resp) => sendFile(resp, 'index.html'));

app.get(ROUTE.STATIC_FILE, (req, resp) => sendFile(resp, req.originalUrl.slice(1)))

// => APIs

// => GET

app.get(ROUTE.API.GET.TOKEN_INFO_LIST, cors(corsOpts), API_HANDLER.getTokenInfoList);

// => POST

app.post(ROUTE.API.POST.SAVE_TOKEN_INFO, cors(corsOpts), API_HANDLER.saveTokenInfo);

// => connection listener

app.listen(PORT, msg => console.log('listening on: ' + PORT));