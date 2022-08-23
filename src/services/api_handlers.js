const DB_REPO = require('./db/repo');

const API_HANDLER = (function() {
    return {
        getTokenInfoList: async (_, resp) => {
            console.log('api get token info list');
            try {
              const content = await DB_REPO.getTokenInfos();
              resp.send({
                err: !1,
                data: content
              })
            } catch(e) {
            console.log('catch err:', e);
							resp.status(404).send({
									err: !0,
									msg: e
							})
            }
        },
				saveTokenInfo: async (req, resp) => {
					console.log('api save token info:', req.body);
					const tokenInfo = req.body;
					try {
						const msg = await DB_REPO.saveTokenInfo(tokenInfo);
						resp.send({
							err: !1,
							msg
						})
					} catch(e) {
						resp.status(404).send({
							err: !0,
							msg: e
						})
					}
				}
    }
})();

module.exports = API_HANDLER;