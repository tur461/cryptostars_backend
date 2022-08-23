const { rEqual, tStampJs, isIndex } = require("./utils")

const UserMgmt = {
    list: [],
    allowUser: function(id) { 
        return this._allowPeer(id, !0);
    },
    disAllowUser: function(id) { 
        return this._allowPeer(id, !1);
    },
    allowPeer: function(id, pId) { 
        return this._allowPeer(id, pId, !0);
    },
    disAllowPeer: function(id, pId) { 
        return this._allowPeer(id, pId, !1);
    },
    addUser: function(uname, id) {
        return this.list.push({...this._getNewUser(id)})
    }, 
    addPeer: function(id, pId, pUname) {
        for(let i=0, l=this.list.length; i<l; ++i) {
            if(rEqual(this.list[i].id, id))
                return this.list[i].peers.push(
                    this._getNewPeer(pId, pUname)
                )
        }
    },
    getUsers: function() {
        return [...this.list];
    },
    getPeers: function(id) {
        const uIdx = this._getUserIdx(id);
        if(isIndex(uIdx)) return [...this._getUserAt(uIdx).peers];
        return [];
    },
    getUser: function(id) {
        const uIdx = this._getUserIdx(id);
        if(isIndex(uIdx)) return this._getUserAt(uIdx);
        return null;
    },
    getPeer: function(id, pId) {
        const uIdx = this._getUserIdx(id);
        const pIdx = this._getPeerIdx(id, pId);
        if(isIndex(uIdx) && isIndex(pIdx)) return this._getPeerAt(
            this._getUserAt(uIdx), 
            pIdx
        );
        return null;
    },
    delUser: function(id) {
        const idx = this.list.findIndex(user => rEqual(user.id, id));
        idx > -1 && this.list.splice(idx, 1);
        return idx;
    },
    getUname: function(id) {
        const users = this.list.filter(user => rEqual(user.id, id));
        return users.length ? users[0].uname : 'not found!';
    },
    getId: function(uname) {
        const users = this.list.filter(user => rEqual(user.uname, uname));
        return users.length ? users[0].id : 'not found!';
    },
    delPeer: function(id, pId) {
        for(let i=0, l=this.list.length; i<l; ++i) {
            if(rEqual(this.list[i].id, id)) {
                const idx = this.list[i].peers.findIndex(peer => rEqual(peer.pId, pId));
                return idx > -1 && this.list[i].peers.splice(idx, 1);
            }
        }
    },
    _getUserAt: function(idx) {
        return {...this.list[idx]};
    },
    _getPeerAt: function(user, idx) {
        return {...user.peers[idx]};
    },
    _getUserIdx: function(id) {
        return this.list.findIndex(user => rEqual(user.id, id));
    },
    _getPeerIdx: function(id, pId) {
        const uIdx = this.list.findIndex(user => rEqual(user.id, id));
        if(isIndex(uIdx))
            return this.list[uIdx].peers.findIndex(peer => rEqual(peer.pId, pId));
        return uIdx;
    },
    _getNewUser: (id, uname) => ({
        id,
        uname,
        peers: [],
        allowed: !0,
        time: tStampJs(),
    }),
    _getNewPeer: (pId, pUname) => ({
        pId,
        pUname,
        time: tStampJs(),
        allowed: !1,
    }),
    _allowUser: function(id, allowed) {
        const uIdx = this.list.findIndex(user => rEqual(user.id, id));
        if(isIndex(uIdx)) {
            this.list[uIdx].allowed = allowed;
            return !0;
        }
        return !1;
    },
    _allowPeer: function(id, pId, allowed) {
        const uIdx = this.list.findIndex(user => rEqual(user.id, id));
        if(isIndex(uIdx)) {
            const pIdx = this.list[uIdx].peers.findIndex(peer => rEqual(peer.pId, pId));
            if(isIndex(pIdx)) {
                this.list[uIdx].peers[pIdx].allowed = allowed;
                return !0;
            }
            return !1;
        }
    },
}

module.exports = UserMgmt;