import '../css/index.less';
import MokaEditor from './moka-editor';

console.log('--- this is the docEditor folder ---');

/**
 * 功能描述：
 * 1.
 */

const $editor: any = document.querySelector('.doc-editor');
const showMenuMap: any = {};

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

    initEvents();
}

function initEvents(): void {
    const $header: any = document.querySelector('.header-menu-wrap');
    const $menu: any = $header.querySelector('.header-menu');
    const $menuDropdown: any = $header.querySelector('.menu-dropdown-wrap');
    const $menuline: any = document.querySelector('.header-menu .header-menu-line');
    const $fileList: any = document.querySelector('.document-list-wrap');

    // $editor.addEventListener('focus', function handleEditorFocus() {

    // }, false);

    // 点击 header 中的菜单时
    $menu.addEventListener('click', function handleMenuClick(): void {
        $menu.classList.toggle('active');
        $menuline.classList.toggle('header-menu-animate');
        $menuDropdown.style.display = $menu.classList.contains('active') ? 'block' : 'none';
        showMenuMap.menuDropdown = $menuDropdown;
    }, false);

    // 点击菜单选项时
    $menuDropdown.addEventListener('click', function handleMenuDropdownClick(e: any) {
        console.log('--- e ---', e);
        // debugger;
        let $elem: any = null;
        let node: any = e.target;
        while (node.nodeName.toLowerCase() !== 'li') {
            node = node.parentNode;
        }
        const menuItem: string = node.dataset.menuItem;

        switch (menuItem) {
            case 'fileList':
                $elem = $fileList;
                break;
            default:
                break;
        }

        $elem.style.display = 'block';
        $menuDropdown.style.display = 'none';
        showMenuMap[menuItem] = $elem;
        delete showMenuMap.menuDropdown;
    }, false);

}

window.onload = () => {
    init();
};

// const $editor = document.querySelector('.doc-editor');
// const editor = new MokaEditor($editor);

// console.log('--- editor ---', editor);
