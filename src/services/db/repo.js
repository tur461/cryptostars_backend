const fs = require('fs').promises;
const path = require('path');
const { DB_FILE } = require('../constants');

const isTokenInfoValid = tokenInfo => {
  return !tokenInfo.addr ? !1 :
    !tokenInfo.sym ? !1 :
    !tokenInfo.dec ? !1 :
    !0;
}

const DB_REPO = (function(){
  return {
    saveTokenInfo:  async tokenInfo => {
      if(isTokenInfoValid(tokenInfo)) {
        await fs.writeFile(
          path.resolve(__dirname, DB_FILE.TOKEN_INFOS), 
          JSON.stringify(tokenInfo)
        );
      } else throw new Error('Invalid token info format!')
    },
    getTokenInfos: async _ => {
      const content = await fs.readFile(
        path.resolve(__dirname, DB_FILE.TOKEN_INFOS),
        'utf-8'
      );
      return content;
    }
  }
})();


module.exports = DB_REPO;


