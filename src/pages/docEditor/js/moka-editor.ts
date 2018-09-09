import utils from '../../../utils';
import markdown from './markdown';

const doc: any = document;
const commandsReg = {
    block: /^(?:p|h[1-6]|blockquote|pre)$/,
    inline: /^(?:bold|italic|underline|insertorderedlist|insertunorderedlist|indent|outdent)$/,
    source: /^(?:createlink|unlink)$/,
    insert: /^(?:inserthorizontalrule|insertimage|insert)$/,
    wrap: /^(?:code)$/,
};

function addListener(ctx: any, target: any, type: string, listener: any): any {
    target.addEventListener(type, listener, false);
    return ctx;
}

export default class MokaEditor {
    public config: any;
    public selection: any;
    public markdown = markdown;
    private _range: any;

    constructor(options: any) {
        console.log('--- Editor ---');

        if (!options) throw new Error('Can\'t find options');

        const opts = utils.merge(options);

        this.config = opts;

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
        // const editor = this.config.editor;
        // let range = this.selection.rangeCount && this.selection.getRangeAt(0);
    }

    public setRange(range: any) {
        range = range || this._range;
        if (!range) {
            range = this.getRange();
        }
    }

    public execCommand(name: string, value?: any) {
        name = name.toLowerCase();
    }
}
