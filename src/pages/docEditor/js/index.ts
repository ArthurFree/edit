import '../css/index.less';

console.log('--- this is the docEditor folder ---');

/**
 * 功能描述：
 * 1.
 */

const $doc: any = document.querySelector('.doc-editor');

function setDocMod() {
    const $p: any = document.createElement('p');

    $p.innerHTML = 'hello, world';
    $doc.appendChild($p);
    document.execCommand('defaultParagraphSeparator', false, 'div');
    $doc.focus();
}

function init() {
    setDocMod();
}

window.onload = () => {
    init();
};
