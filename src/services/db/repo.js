const fs = require('fs');
const path = require('path');
const { DB_FILE, ERROR } = require('../constants');
const { jString, jObject } = require('../utils');

const fsPromise = fs.promises;

const isTokenInfoValid = tokenInfo => {
  return !tokenInfo.addr ? !1 :
    !tokenInfo.sym ? !1 :
    !tokenInfo.dec ? !1 :
    !tokenInfo.icon ? !1 :
    !tokenInfo.name ? !1 :
    !tokenInfo.supply ? !1 :
    !0;
}

const isPoolInfoValid = poolInfo => {
  return !0;
}

const DB_REPO = (function(){
  return {
    savePoolInfo:  async poolInfo => {
      if(isPoolInfoValid(poolInfo)) {
        const filePath = path.resolve(__dirname, DB_FILE.POOl_INFOS);
        return new Promise(
          (r, j) => fs.readFile(filePath, 'utf-8', (e, content) => {
            content = jObject(content);
            content.push(poolInfo);
            
            fs.writeFile(
              filePath, 
              jString(content), 
              {flag: 'w'},
              (e, s) => e && j(e) || r(poolInfo)
            );  
        }));
        
      } else throw ERROR.POOL_FORMAT;
    },
    saveTokenInfo:  async tokenInfo => {
      if(isTokenInfoValid(tokenInfo)) {
        const filePath = path.resolve(__dirname, DB_FILE.TOKEN_INFOS);
        return new Promise(
          (r, j) => fs.readFile(filePath, 'utf-8', (e, content) => {
            content = jObject(content);
            content.push(tokenInfo);            
            fs.writeFile(
              filePath, 
              jString(content), 
              {flag: 'w'}, 
              (e, s) => e && j(e) || r(tokenInfo)
            );  
        }));
        
      } else throw ERROR.TOKEN_FORMAT;
    },
    getPoolInfoList: async _ => {
      const content = await fsPromise.readFile(
        path.resolve(__dirname, DB_FILE.POOl_INFOS),
        'utf-8'
      );
      return content;
    },
    getTokenInfoList: async _ => {
      const content = await fsPromise.readFile(
        path.resolve(__dirname, DB_FILE.TOKEN_INFOS),
        'utf-8'
      );
      return content;
    },
    getProjectVersion: async projectId => {
      const content = JSON.parse(await fsPromise.readFile(
        path.resolve(__dirname, DB_FILE.MISC_INFO),
        'utf-8'
      ));
      return content.version[projectId];
    },
    setProjectVersion: async (projectId, version) => {
      const filePath = path.resolve(__dirname, DB_FILE.MISC_INFO);
      return new Promise(async (r, j) => {
        const content = jObject(await fsPromise.readFile(
          filePath,
          'utf-8'
        ));
        content.version[projectId] = version;
        fs.writeFile(
          filePath, 
          jString(content), 
          {flag: 'w'}, 
          (e, s) => e && j(e) || r('success')
        );
      })
    }
  }
})();


module.exports = DB_REPO;


