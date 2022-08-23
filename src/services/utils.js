const isNumInput = v => /^[0-9]*[.,]?[0-9]*$/gmi.test(v);

const notNumInput = v => !isNumInput(v);

const jString = o => JSON.stringify(o);

const jObject = s => JSON.parse(s);

const isStr = s => typeof s === 'string';

const isObj = o => typeof o === 'object';

const isArr = v => v instanceof Array;

const isNum = n => typeof n === 'number';

const isNull = v => rEqual(`${v}`, 'null');

const notNull = v => !isNull(v);

// for time being it works only with depth 1
// for depth>1 we need to recursively 
// check keys as well as values
const compare2objs = (a, b) => {
    a = notNull(a) ? Object.keys(a).sort() : a;
    b = notNull(b) ? Object.keys(b).sort() : b;
    return jString(a) === jString(b);
}

const rEqual = (a, b) => {
    if(isObj(a) && isObj(b)) {
        let s1 = '', s2 = '';
        try { s1 = jString(a) } catch(e) { return compare2objs(a, b) }
        try { s2 = jString(b) } catch(e) { return compare2objs(a, b) }
        return s1 === s2;
    }
    return isStr(a) && isStr(b) ?
    a.toLowerCase() === b.toLowerCase() :
    isNum(a) && isNum(b) ? a === b : 
    a === b;
}

const nullFunc = _ => { _.preventDefault(); console.log('null function'); }

const notEqual = (a, b) => !rEqual(a, b);

const isNaN = n => rEqual(n, NaN) || rEqual(n, 'NaN') || rEqual(`${n}`, 'NaN');

const isDefined = v => notEqual(v, 'null') && notEqual(v, null) && notEqual(v, 'undefined') && notEqual(v, undefined);

const notDefined = v => !isDefined(v);

const notEmpty = v => typeof v == 'string' ? 
        notEqual(v, '') && notEqual(v, '0') : 
        isArr(v) ? v.length :
        isObj(v) ? Object.entries(v).length : 
        !!v;

const isEmpty = v => !notEmpty(v);

const contains = (txt, v) => txt.toLowerCase().indexOf(v.toLowerCase()) > -1;

const evDispatch = (eName, d) => dispatchEvent(new CustomEvent(eName, {detail: d}));

const cLog = function() {console.log(...arguments)};

const Arr = {
    any: (arr, elm) => {
        for(let i=0, l=arr.length; i<l; ++i) {
            if(isStr(arr[i]) && isStr(elm) && contains(arr[i], elm)) return !0;
            if(isNum(arr[i]) && isNum(elm) && rEqual(arr[i], elm)) return !0;
            if(isObj(arr[i]) && isObj(elm) && compare2objs(arr[i], elm)) return !0;
        }
        return !1;
    },
    every: (arr, cbk) => arr.every(a => {
        if(isObj(a)) return cbk(a);
        return a;
    }),

}

const isIndex = idx => idx > -1;

// in msec
const tStampJs = offset => Date.now() + ((isDefined(offset) ? offset : 0) * 1000);
// in sec
const tStampNix = offset => Math.ceil(tStampJs()/1000) + (isDefined(offset) ? offset : 0);

module.exports = {
    Arr,
    cLog,
    isNum,
    isNaN,
    rEqual,
    isNull,
    isEmpty,
    isIndex,
    jObject,
    notNull,
    jString,
    notEqual,
    contains,
    nullFunc,
    notEmpty,
    tStampJs,
    tStampNix,
    isDefined,
    notDefined,
    isNumInput,
    evDispatch,
    notNumInput,
}
