import { relocateRoot } from "./relocate_root.mjs"

document.addEventListener('DOMContentLoaded', function() {
    const path = relocateRoot('json/translate_sidebar_menu.json');

    fetch(path)
    .then(() => {
        
    })
    .catch(() => {console.log('寄啦！JSON路径又炸了！')});
})