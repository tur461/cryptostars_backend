
const PORT = 8448;

const UPLOAD_PATH = 'src/public/uploads/';

const DB_FILE = {
  POOl_INFOS: 'files/pool_info.json',
  TOKEN_INFOS: 'files/token_info.json',
  MISC_INFO: 'files/miscellaneous_info.json',
}

const ROUTE = {
  ADMIN_PANEL: '/',
  STATIC_FILE: [
    '*.xml', 
    '/*.png', 
    '/*.html',
    '/*.ico', 
    '/*.json', 
    '/static/*',
    '/uploads/*.png', 
    '/uploads/*.jpg', 
    '/uploads/*.jpeg',
    '/robots.txt',
  ],
  API: {
    GET: {
      POOL_INFO_LIST: '/api/get/poolInfoList',
      TOKEN_INFO_LIST: '/api/get/tokenInfoList',
    },
    POST: {
      SAVE_POOL_INFO: '/api/save/poolInfo',
      SAVE_TOKEN_INFO: '/api/save/tokenInfo',
      SAVE_TOKEN_ICON: '/api/save/tokenIcon',
      PROJECT_VERSION: '/api/get/projectVersion',
      UPDATE_PROJECT_VER: '/api/update/projectVersion',
    }
  }
}

const ERROR = {
  POOL_FORMAT: 'Invalid pool info format!',
  TOKEN_FORMAT: 'Invalid token info format!',
}

const STATUS_CODE = {
  NOT_FOUND: 404,
  INVALID_DATA: 422,
  INTERNAL_SERVER_ERROR: 500,
}

const PROJECT_IDS = [
  'front_end',
  'admin_panel',
]

module.exports = {
  PORT,
  ERROR,
  ROUTE,
  DB_FILE,
  PROJECT_IDS,
  UPLOAD_PATH,
  STATUS_CODE,
}
