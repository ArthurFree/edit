const toString: any = Object.prototype.toString;
const utils: any = {
    is: (obj: any, type: string): boolean => {
        return toString.call(obj).slice(8, -1) === type;
    },

    delayExec: (fn: any): any => {
        let timer: any|undefined;
        return (delay: number): void => {
            clearTimeout(timer);
            timer = setTimeout((): void => {
                fn();
            }, delay || 1);
        };
    },

    forEach: (obj: any, iterator: any, arrayLike: boolean): any => {
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
    copy: (options: any, source: any): void => {
        utils.forEach(source, (value: string, key: string): void => {
            options[key] = utils.is(value, 'Object') ? utils.copy({}, value) :
                utils.is(value, 'Array') ? utils.copy([], value) : value;
        });

        return options;
    },

    merge: (options: any): any => {
        let defaults: any = {
            class: 'moka',
        };

        if (options.nodeType === 1) {
            defaults.editor = options;
        } else {
            defaults = utils.copy(defaults, options);
        }

        return defaults;
    },

    stopPropagation: (e: any): void => {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },
};

export default utils;
