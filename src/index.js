const fs = require('fs');
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
  destination: (req, file, cb) => {
		fs.mkdirSync(UPLOAD_PATH, { recursive: true })
		cb(null, UPLOAD_PATH);
	},
  filename: (req, file, cb)=> cb(null, file.originalname.split(' ').join('_')),
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

app.get(ROUTE.API.GET.POOL_INFO_LIST, cors(corsOpts), API_HANDLER.getPoolInfoList);

app.get(ROUTE.API.GET.TOKEN_INFO_LIST, cors(corsOpts), API_HANDLER.getTokenInfoList);


// => POST

app.post(ROUTE.API.POST.SAVE_POOL_INFO, cors(corsOpts), API_HANDLER.savePoolInfo);

app.post(ROUTE.API.POST.SAVE_TOKEN_INFO, cors(corsOpts), API_HANDLER.saveTokenInfo);

app.post(ROUTE.API.POST.PROJECT_VERSION, cors(corsOpts), API_HANDLER.getProjectVersion);

app.post(ROUTE.API.POST.UPDATE_PROJECT_VER, cors(corsOpts), API_HANDLER.updateProjectVersion);

app.post(ROUTE.API.POST.SAVE_TOKEN_ICON, cors(corsOpts), upload.single('token_icon'), API_HANDLER.saveTokenIcon);

// => connection listener

app.listen(PORT, msg => console.log('listening on: ' + PORT));