const markdown: any = {
    action: (moka: any, cmd: string[]): boolean|void => {
        // 判断标识符在行首位置
        if (moka.selection.focusOffset > cmd[1]) {
            return false;
        }

        // 获取当前光标所在的文本节点
        const node = moka.selection.focusNode;
        // 去除文本节点中的标识符
        node.textContent = node.textContent.slice(cmd[1]);
        moka.execCommand(cmd[0]);
    },
    init: (moka: any): void => {
        moka.on('keypress', (e: any): any => {
            const cmd = markdown.parse(e);
            if (cmd) return markdown.action(moka, cmd);
        });
    },
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

        // 按下空格时，返回 cmd 变量，否则返回 false
        if (code === 32) {
            const markdownSyntax = markdown.stack.join('');
            const cmd = markdown.valid(markdownSyntax);
            markdown.stack = [];

            if (cmd) {
                e.preventDefault();
                return cmd;
            }
        }

        if (markdown.keymap[code]) markdown.stack.push(markdown.keymap[code]);

        return false;
    },
    stack: [],
    valid: (str: string): boolean|[string, number] => {
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
                return false;
        }
    },
};

export default markdown;
