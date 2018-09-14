import '../css/index.less';
import MokaEditor from './moka-editor';

console.log('--- this is the docEditor folder ---');

/**
 * 功能描述：
 * 1.
 */

const doc = document;
const $editor: any = document.querySelector('.doc-editor');
const $header: any = document.querySelector('.header-menu-wrap');
const $menu: any = $header.querySelector('.header-menu');
const $menuDropdown: any = $header.querySelector('.menu-dropdown-wrap');
const $menuline: any = document.querySelector('.header-menu .header-menu-line');
const showMenuMap: any = {};

function setDocMod() {
    const $p: any = document.createElement('p');

    $p.innerHTML = 'hello, world';
    $editor.appendChild($p);
    document.execCommand('defaultParagraphSeparator', false, 'div');
    $editor.focus();
}

function toggleMenu(): void {
    $menu.classList.toggle('active');
    $menuline.classList.toggle('header-menu-animate');
    $menuDropdown.style.display = $menu.classList.contains('active') ? 'block' : 'none';
}

function closeMenu(): void {
    $menu.classList.remove('active');
    $menuline.classList.remove('header-menu-animate');
    $menuDropdown.style.display = 'none';
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
    const $fileList: any = document.querySelector('.document-list-wrap');

    // $editor.addEventListener('focus', function handleEditorFocus() {

    // }, false);

    // 点击 header 中的菜单时
    $menu.addEventListener('click', function handleMenuClick(e: any): void {
        e.stopPropagation();
        toggleMenu();
        showMenuMap.menuDropdown = $menuDropdown;
    }, false);

    // 点击菜单选项时
    $menuDropdown.addEventListener('click', function handleMenuDropdownClick(e: any) {
        e.stopPropagation();
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

        $menu.classList.remove('active');
        $menuline.classList.remove('header-menu-animate');
        $elem.classList.add('active');
        $menuDropdown.style.display = 'none';
        showMenuMap[menuItem] = $elem;
        delete showMenuMap.menuDropdown;
    }, false);

    doc.addEventListener('click', function handleClickDoc() {
        closeMenu();
    }, false);
}

window.onload = () => {
    init();
};

// const $editor = document.querySelector('.doc-editor');
// const editor = new MokaEditor($editor);

// console.log('--- editor ---', editor);
