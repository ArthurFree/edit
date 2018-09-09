import utils from '../../../utils';
import markdown from './markdown';

function addListener(ctx: any, target: any, type: string, listener: any): any {
    target.addEventListener(type, listener, false);
    return ctx;
}

export default class MokaEditor {
    public config: any;
    public markdown = markdown;

    constructor(options: any) {
        console.log('--- Editor ---');

        if (!options) throw new Error('Can\'t find options');

        const opts = utils.merge(options);

        this.config = opts;

        if (this.markdown) this.markdown.init(this);
    }

    public on(type: string, listener: any) {
        addListener(this, this.config.editor, type, listener);
        return this;
    }
}
