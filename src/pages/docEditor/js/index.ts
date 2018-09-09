import '../css/index.less';
import MokaEditor from './moka-editor';

console.log('--- this is the docEditor folder ---');

/**
 * 功能描述：
 * 1.
 */

const $editor: any = document.querySelector('.doc-editor');

function setDocMod() {
    const $p: any = document.createElement('p');

    $p.innerHTML = 'hello, world';
    $editor.appendChild($p);
    document.execCommand('defaultParagraphSeparator', false, 'div');
    $editor.focus();
}

function init() {
    const $docEditor: any = document.querySelector('.document-editor');
    $docEditor.style.visibility = 'visible';

    const editor = new MokaEditor($editor);

    console.log('--- editor ---', editor);

    setDocMod();
}

window.onload = () => {
    const $menu: any = document.querySelector('.header-menu');
    init();

    $menu.addEventListener('click', function handleMenuClick(): void {

        const $menuline: any = document.querySelector('.header-menu .header-menu-line');

        $menu.classList.add('active');
        $menuline.classList.add('header-menu-animate');
    }, false);
};

// const $editor = document.querySelector('.doc-editor');
// const editor = new MokaEditor($editor);

// console.log('--- editor ---', editor);
