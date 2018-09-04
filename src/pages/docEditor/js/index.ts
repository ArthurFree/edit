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
    const $docEditor: any = document.querySelector('.document-editor');
    $docEditor.style.visibility = 'visible';

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
