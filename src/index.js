const cors = require('cors');
const multer = require('multer');
const express = require('express');
const bodyParser = require("body-parser");
const { sendFile } = require('./services/helpers.js');
const API_HANDLER = require('./services/api_handlers.js');
const { ROUTE, PORT, UPLOAD_PATH } = require('./services/constants.js');

const corsOpts = {
	origin: '*',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_PATH),
  filename: (req, file, cb)=> cb(null, file.originalname),
});

const app = express();

const upload = multer({ storage });

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

app.post(ROUTE.API.POST.SAVE_TOKEN_ICON, cors(corsOpts), upload.single('token_icon'), API_HANDLER.saveTokenIcon);

// => connection listener

app.listen(PORT, msg => console.log('listening on: ' + PORT));