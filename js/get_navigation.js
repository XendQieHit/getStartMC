/* 不能直接调用该文件！ */
/* 该文件只是一个通用模板！ */
/* 要使用此脚本，请将该代码插入本体html文件中，以此避免fetch方法的路径捕获发生错误。 */

// 主目录

document.addEventListener('DOMContentLoaded', function() {
    const location = document.documentURI || document.URL;
    let loc_array = location.split('/');
    loc_array.pop();
    
    let i = loc_array.length - 1;
    let loc_array_translated;
    let loc_array_buffer;

    fetch('../../docs/folder_name_translate.json')
    .then(response => response.json())
    .then(data => {
        for (let j of data.root) {
            if (loc_array[i] === j.path) {
                loc_array_translated = j.name;
                loc_array_buffer = loc_array.pop();
            }
        }

        const nav = document.querySelector('.toppic_bar_navigation_content');

        const nav_element = document.createElement('a');
        nav_element.textContent = ' > ' + loc_array_translated;

        let nav_quicklink = '';
        for (let k of loc_array) nav_quicklink += k + '/';
        
        nav_quicklink += loc_array_buffer + '/' + loc_array_buffer + '.html';

        nav_element.href = nav_quicklink;
        nav.appendChild(nav_element);

    })
    .catch(console.log('寄啦！JSON路径又炸了！'));
});

// 子条目

document.addEventListener('DOMContentLoaded', function() {
    const location = document.documentURI || document.URL;
    let loc_array = location.split('/');
    loc_array.pop();
    
    let i = loc_array.length - 1;
    let loc_array_translated = [];
    let loc_array_buffer = [];


    fetch('../../../docs/folder_name_translate.json')
    .then(response => response.json())
    .then(data => {
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
        const nav = document.querySelector('.toppic_bar_navigation_content');

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
    .catch(console.log('寄啦！JSON路径又炸了！'));
});