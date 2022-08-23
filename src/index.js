const express = require('express');
const bodyParser = require("body-parser");
const { sendFile } = require('./services/helpers.js');
const API_HANDLER = require('./services/api_handlers.js');
const { ROUTE, PORT } = require('./services/constants.js');

const app = express();

// express plugins and extensions

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

// => Admin panel

app.get(ROUTE.ADMIN_PANEL, (_, resp) => sendFile(resp, 'index.html'));

app.get(ROUTE.STATIC_FILE, (req, resp) => sendFile(resp, req.originalUrl.slice(1)))

// => APIs

app.get(ROUTE.API.GET.TOKEN_INFO_LIST, API_HANDLER.getTokenInfoList)

app.post(ROUTE.API.POST.SAVE_TOKEN_INFO, API_HANDLER.saveTokenInfo)

// => connection listener

app.listen(PORT, msg => console.log('listening on: ' + PORT));