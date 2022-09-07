const { STATUS_CODE, PROJECT_IDS } = require('./constants');
const DB_REPO = require('./db/repo');
const { jObject, contains } = require('./utils');

const API_HANDLER = (function() {
    return {
        getProjectVersion: async (req, resp) => {
            console.log('api get project version');
            try {
				const projectId = req.body.projectId;
				if(!contains(PROJECT_IDS, projectId)) 
					throw new Error('invalid projectId: ' + projectId);
				const data = await DB_REPO.getProjectVersion(projectId);
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
        updateProjectVersion: async (req, resp) => {
            console.log('api get project version');
            try {
				const projectId = req.body.projectId;
				if(!contains(PROJECT_IDS, projectId)) 
					throw new Error('invalid projectId: ' + projectId);
				const data = await DB_REPO.setProjectVersion(projectId);
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
		getPoolInfoList: async (_, resp) => {
            console.log('api get token info list');
            try {
				const data = await DB_REPO.getPoolInfoList();
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
		savePoolInfo: async (req, resp) => {
			try {
				const poolInfo = req.body;
				const data = await DB_REPO.savePoolInfo(poolInfo);
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