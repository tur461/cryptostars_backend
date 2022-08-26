
const PORT = 8448;

const DB_FILE = {
  TOKEN_INFOS: 'files/token_info.json',
}

const ROUTE = {
  ADMIN_PANEL: '/',
  STATIC_FILE: [
    '*.xml', 
    '/*.png', 
    '/*.ico', 
    '/*.json', 
    '/static/*', 
    '/robots.txt',
  ],
  API: {
    GET: {
      TOKEN_INFO_LIST: '/api/get/tokenInfoList',
    },
    POST: {
      SAVE_TOKEN_INFO: '/api/save/tokenInfo',
    }
  }
}

const ERROR = {
  TOKEN_FORMAT: 'Invalid token info format!',
}

const STATUS_CODE = {
  NOT_FOUND: 404,
  INVALID_DATA: 422,
  INTERNAL_SERVER_ERROR: 500,
}

module.exports = {
  PORT,
  ERROR,
  ROUTE,
  DB_FILE,
  STATUS_CODE,
}
