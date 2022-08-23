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

module.exports = {
  ROUTE,
  DB_FILE,
}
