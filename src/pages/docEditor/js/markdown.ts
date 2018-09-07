const markdown: any = {
    keymap: {
        96: '`',
        62: '>',
        49: '1',
        46: '.',
        45: '-',
        42: '*',
        35: '#',
    },
    parse: (e: any): any => {
        const code = e.keyCode || e.which;

        // 按下空格时
        if (code === 32) {
            console.log('TODO');
        }
    },
    stack: [],
    valid: (str: string): any => {
        const len = str.length;

        if (str.match(/[#]{1,6}/)) {
            return ['h' + len, len];
        } else if (str.match(/(?:\.|\*|\-){3,}/)) {
            return ['inserthorizontalrule', len];
        }

        switch (str) {
            case '```':
                return ['pre', len];
            case '>':
                return ['blockquote', len];
            case '1.':
                return ['inserorderedlist', len];
            case '-':
            case '*':
                return ['insertunorderedlist', len];
            default:
                return;
        }
    },
};
