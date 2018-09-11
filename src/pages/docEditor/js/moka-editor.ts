import utils from '../../../utils';
import markdown from './markdown';

const doc: any = document;
const commandsReg = {
    block: /^(?:p|h[1-6]|blockquote|pre)$/,
    inline: /^(?:bold|italic|underline|insertorderedlist|insertunorderedlist|indent|outdent)$/,
    insert: /^(?:inserthorizontalrule|insertimage|insert)$/,
    source: /^(?:createlink|unlink)$/,
    wrap: /^(?:code)$/,
};
const effectNodeReg = /(?:[pubia]|h[1-6]|blockquote|[uo]l|li)/i;

function toggleNode(node: any, hide: boolean): void {
    node.style.display = hide ? 'none' : 'block';
}

function addListener(ctx: any, target: any, type: string, listener: any): any {
    target.addEventListener(type, listener, false);
    return ctx;
}

function getNode(ctx: any, byRoot?: any): any {
    const root = ctx.config.editor;
    let node;

    ctx._range = ctx._range || ctx.getRange();
    node = ctx._range.commonAncestorContainer;
    if (!node || node === root) return null;
    while (node && (node.nodeType !== 1) && (node.parentNode !== root)) {
        node = node.parentNode;
    }
    while (node && byRoot && (node.parentNode !== root)) {
        node = node.parentNode;
    }

    return containsNode(root, node) ? node : null;
}

function effectNode(ctx: any, el: any, returnAsNodeName: any) {
    const nodes = [];
    el = el || ctx.config.editor;
    while (el && el !== ctx.config.editor) {
        if (el.nodeName.match(effectNodeReg)) {
            nodes.push(returnAsNodeName ? el.nodeName.toLowerCase() : el);
        }
        el = el.parentNode;
    }
    return nodes;
}

function containsNode(parent: any, child: any): boolean {
    if (parent === child) return true;
    child = child.parentNode;
    while (child) {
        if (child === parent) return true;
        child = child.parentNode;
    }
    return false;
}

function commandOverall(ctx: any, cmd: string, val: any) {
    try {
        doc.execCommand(cmd, false, val);
        console.log('---- ctx ----', ctx);
    } catch (e) {
        return console.log('--- fail commandOverall ---');
    }
}

function commandInsert(ctx: any, name: string, val: any): any {
    const node = getNode(ctx);
    if (!node) return;
    ctx._range.selectNode(node);
    ctx._range.collapse(false);

    // if (name === 'inserimage' &&)

    return commandOverall(ctx, name, val);
}

function commandBlock(ctx: any, name: string): any {
    const list = effectNode(ctx, getNode(ctx), true);

    if (list.indexOf(name) !== -1) name = 'p';
    return commandOverall(ctx, 'formatblock', name);
}

function commandWrap(ctx: any, tag: string, value: any): any {
    value = '<' + tag + '>' + (value || ctx.selection.toString()) + '</' + tag + '>';
    return commandOverall(ctx, 'insertHTML', value);
}

function commandLink(ctx: any, tag: string, value: any): any {
    if (ctx.config.linksInNewWindow) {
        value = '<a href="' + value + '" target="_blank">' + (ctx.selection.toString()) + '</a>';
        return commandOverall(ctx, 'insertHTML', value);
    } else {
        return commandOverall(ctx, tag, value);
    }
}

function initToolbar(ctx: any): void {
    ctx._menu = doc.querySelector('.doc-toolbar');
    toggleNode(ctx._menu, true);
}

function initEvents(ctx: any): void {
    const editor = ctx.config.editor;
    let selecting: boolean = false;

    function updateStatus(delay: number): void {
        ctx._range = ctx.getRange();
        utils.delayExec(() => {
            ctx.menu();
        })(delay);
    }
    addListener(ctx, editor, 'mousedown', () => {
        selecting = true;
    });
    addListener(ctx, editor, 'mouseleave', () => {
        if (selecting) updateStatus(800);
        selecting = false;
    });
    addListener(ctx, editor, 'mouseup', () => {
        debugger;
        if (selecting) updateStatus(100);
        selecting = false;
    });
}

export default class MokaEditor {
    public config: any;
    public selection: any;
    public markdown = markdown;
    private _range: any;
    private _menu: any;
    private _stylesheet: any;

    constructor(options: any) {
        console.log('--- Editor ---');

        if (!options) throw new Error('Can\'t find options');

        const opts = utils.merge(options);

        this.config = opts;

        initToolbar(this);

        initEvents(this);

        if (doc.getSelection) {
            this.selection = doc.getSelection();
        }

        if (this.markdown) this.markdown.init(this);
    }

    public on(type: string, listener: any) {
        addListener(this, this.config.editor, type, listener);
        return this;
    }

    public getRange() {
        const editor = this.config.editor;
        const range = this.selection.rangeCount && this.selection.getRangeAt(0);

        if (!range) doc.createRange();
        if (!containsNode(editor, range.commonAncestorContainer)) {
            range.selectNodeContents(editor);
            range.collapse(false);
        }
        return range;
    }

    public menu(): any {
        if (this.selection.isCollapsed) {
            toggleNode(this._menu, true);
        }

        const offset = this._range.getBoundingClientRect();
        const menuPadding: number = 10;
        const top: number = offset.top + menuPadding;
        const left: number = offset.left + (offset.width / 2);
        const menuOffset: any = { x: 0, y: 0 };

        if (offset.width === 0 && offset.height === 0) return;

        if (this._stylesheet === undefined) {
            const style = doc.createElement('style');
            document.head.appendChild(style);
            this._stylesheet = style.sheet;
        }

        toggleNode(this._menu, false);

        menuOffset.x = left - (this._menu.clientWidth / 2);
        menuOffset.y = top + this._menu.clientHeight;

        if (this._stylesheet.cssRules.length > 0) {
            this._stylesheet.deleteRule(0);
        }

        this._menu.style.top = menuOffset.y + 'px';
        this._menu.style.left = menuOffset.x + 'px';
    }

    public setRange(range?: any): any {
        range = range || this._range;
        if (!range) {
            range = this.getRange();
            range.collapse(false);
        }
        try {
            this.selection.removeAllRanges();
            this.selection.addRange(range);
        } catch (e) {/* throw error */}

        return this;
    }

    public execCommand(name: string, value?: any) {
        name = name.toLowerCase();
        this.setRange();

        if (commandsReg.block.test(name)) {
            commandBlock(this, name);
        } else if (commandsReg.inline.test(name)) {
            commandOverall(this, name, value);
        } else if (commandsReg.source.test(name)) {
            commandLink(this, name, value);
        } else if (commandsReg.insert.test(name)) {
            commandInsert(this, name, value);
        } else if (commandsReg.wrap.test(name)) {
            commandWrap(this, name, value);
        } else {
            console.log('---- can not find command function for name: ' + name);
        }
        // if (name === 'indent') {
            // this.checkContentChange();
        // } else {
            // this.cleanContent({cleanAttrs: ['style']});
        // }
    }
}
