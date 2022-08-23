const express = require('express');
const bodyParser = require("body-parser");
const { sendFile } = require('./services/helpers.js');
const { ROUTE } = require('./services/constants.js');
const API_HANDLER = require('./services/api_handlers.js');

// const http = require('http');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get(ROUTE.ADMIN_PANEL, (_, resp) => sendFile(resp, 'index.html'));

app.get(ROUTE.STATIC_FILE, (req, resp) => sendFile(resp, req.originalUrl.slice(1)))

app.get(ROUTE.API.GET.TOKEN_INFO_LIST, API_HANDLER.getTokenInfoList)

app.post(ROUTE.API.POST.SAVE_TOKEN_INFO, API_HANDLER.saveTokenInfo)

app.listen(8448, msg => console.log('listening on 8448'));
