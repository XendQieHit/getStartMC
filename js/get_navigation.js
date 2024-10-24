import {relocateRoot} from './relocate_root.mjs'; //使json文件其实路径重定向至根目录

document.addEventListener('DOMContentLoaded', function() {

    const path = relocateRoot('json/translate_folder_name.json');

    let loc_array = document.documentURI || document.URL;
    loc_array = loc_array.split('/');
    loc_array.pop();
    
    let i = loc_array.length - 1;
    let loc_array_translated = [];
    let loc_array_buffer = [];

    // 获取json文件
    fetch(path)
    .then(response => response.json())
    .then(data => {

        // 开始检索html所在的路径并进行处理
        for (let j of data.root) {
            if (loc_array[i-1] === j.path) {
                loc_array_translated.push(j.name);

                for (let k of j.branches) {
                    if (loc_array[i] === k.path) {
                        loc_array_translated.push(k.name);
                        loc_array_buffer.push(loc_array.pop());
                    }
                }
                loc_array_buffer.push(loc_array.pop());
            }
        }
        const nav = document.querySelector('.nav_list');

        loc_array_buffer.reverse();

        for (let j = 0; j < loc_array_translated.length; j++) {
            const nav_element = document.createElement('a');
            nav_element.textContent = ' > ' + loc_array_translated[j];

            let nav_quicklink = '';
            for (let k of loc_array) nav_quicklink += k + '/';
            
            for (let i = 0; i <= j; i++) {
                nav_quicklink += loc_array_buffer[i] + '/';
            }
            nav_quicklink += loc_array_buffer[j] + '.html';
            
            nav_element.href = nav_quicklink;
            nav.appendChild(nav_element);
        }
    })
    .catch(() => {console.log('寄啦！JSON路径又炸了！')});
});