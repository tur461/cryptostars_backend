const DB_REPO = require('./db/repo');
const { jObject } = require('./utils');

const API_HANDLER = (function() {
    return {
        getTokenInfoList: async (_, resp) => {
            console.log('api get token info list');
            try {
              const data = await DB_REPO.getTokenInfoList();
              resp.send({
                data,
                err: !1,
              })
            } catch(e) {
            console.log('catch err:', e);
							resp.status(404).send({
								msg: e,
								err: !0,
							})
            }
        },
				saveTokenInfo: async (req, resp) => {
					console.log('api save token info:', req.body);
					const tokenInfo = req.body;
					try {
						const data = await DB_REPO.saveTokenInfo(tokenInfo);
						resp.send({
							data,
							err: !1,
						})
					} catch(e) {
						resp.status(404).send({
							msg: e,
							err: !0,
						})
					}
				}
    }
})();

module.exports = API_HANDLER;