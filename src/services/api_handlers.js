const { STATUS_CODE } = require('./constants');
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
				resp.status(STATUS_CODE.INTERNAL_SERVER_ERROR)
				.send({
					msg: e,
					err: !0,
				});
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
				resp.status(STATUS_CODE.INVALID_DATA)
				.send({
					msg: e,
					err: !0,
				});
			}
		},
		saveTokenIcon: async (req, resp) => {
			try {
				console.log('save token icon headers:', req.headers);
				console.log('body:', req.body);
				console.log('token icon:', req.file);
				resp.json({
					msg: 'token icon upload success!'
				})
			} catch(e) {
				resp.status(STATUS_CODE.INVALID_DATA)
				.send({
					msg: e,
					err: !0,
				});
			}
		}
    }
})();

module.exports = API_HANDLER;