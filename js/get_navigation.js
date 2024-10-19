document.addEventListener('DOMContentLoaded', function() {

    /* 
        获取json文件绝对路径
    */

    // 获取运行时的绝对路径根目录
    const running_path = document.documentURI;
    let path_array = running_path.split('/');
    for (let i = path_array.length - 1; path_array[i] !== 'docs' && i >= 0; i--) {
        path_array.pop();
    }
    path_array.pop();
    
    let path = '';

    for (let i = 0; i <= path_array.length - 1; i++) {
        path += path_array[i] + '/'
    }

    // 在这里输入你要调用的json文件的路径
    path += 'json/menu_list.json';

    /* 代码正式部分 */

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