const toString: any = Object.prototype.toString;
const utils: any = {
    is: (obj: any, type: string): boolean => {
        return toString.call(obj).slice(8, -1) === type;
    },

    foreach: (obj: any, iterator: any, arrayLike: boolean): any => {
        if (!obj) return;
        if (arrayLike == null) arrayLike = utils.is(obj, 'Array');
        if (arrayLike) {
            for (let i = 0, len = obj.length; i < len; i++) iterator(obj[i], i, obj);
        } else {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) iterator(obj[key], key, obj);
            }
        }
    },

    log: (message: string): void => {
        console.log('%c EDITOR DEBUGGER: %c' + message,
        'font-family:arial,sans-serif;color:#1abf89;line-height:2em;',
        'font-family:cursor,monospace;color:#333;');
    },

    /* copy: () => {},

    mergeOpts: (options: any): any => {
        const defaults: any = {
            selector: '.doc-editor',
        };

        return defaults;
    } */
};

export default utils;
