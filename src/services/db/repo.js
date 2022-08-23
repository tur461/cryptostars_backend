const fs = require('fs');
const path = require('path');
const { DB_FILE, ERROR } = require('../constants');
const { jString, jObject } = require('../utils');

const fsPromise = fs.promises;

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
        const filePath = path.resolve(__dirname, DB_FILE.TOKEN_INFOS);
        return new Promise(
          (r, j) => fs.readFile(filePath, 'utf-8', (e, content) => {
            content = jObject(content);
            content.push(tokenInfo);
            console.log('content:',content, filePath);
            
            fs.writeFile(
              filePath, 
              jString(content), 
              {flag: 'w'}, 
              (e, s) => e && j(e) || r(tokenInfo)
            );  
        }));
        
      } else throw ERROR.TOKEN_FORMAT;
    },
    getTokenInfoList: async _ => {
      const content = await fsPromise.readFile(
        path.resolve(__dirname, DB_FILE.TOKEN_INFOS),
        'utf-8'
      );
      return content;
    }
  }
})();


module.exports = DB_REPO;


