import { relocateRoot } from '../relocate_root.mjs'; // 使json文件其实路径重定向至根目录
import { jsonDeeplySearch } from '../json_recursive_search.mjs'; // json文件词条检索

function get_navigation() {

    const file_path = relocateRoot('json/translate_folder_name.json');

    let loc_array = document.documentURI || document.URL;

    if (loc_array.match(/.*(?=#)/)) {
        loc_array = loc_array.match(/.*(?=#)/);
        loc_array = loc_array.toString();
    }

    loc_array = loc_array.split('/');
    
    const nav_list = document.querySelector('.nav_list');

    // 声明一个添加 a 的方法，方便后面使用
    function addNewA(arr) {

        const a = document.createElement('a');
                    
        a.href = relocateRoot('') + arr[1];
        a.textContent = " > " + arr[0];

        arr[2].appendChild(a);
    }

    // 获取json文件
    fetch(file_path)
    .then(response => response.json())
    .then(data => {

        let title, href;

        jsonDeeplySearch(data, "path", loc_array, addNewA, [title, "title"], [href, "href"], nav_list);

    })
}
export { get_navigation };