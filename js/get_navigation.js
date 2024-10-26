import {relocateRoot} from './relocate_root.mjs'; //使json文件其实路径重定向至根目录

document.addEventListener('DOMContentLoaded', function() {

    const file_path = relocateRoot('json/translate_folder_name.json');

    let loc_array = document.documentURI || document.URL;
    loc_array = loc_array.split('/');
    
    const nav_list = document.querySelector('.nav_list');




    // 声明一个添加 a 的方法，方便后面使用
    function addNewA(arr) {

        const a = document.createElement('a');
                    
        a.href = loc_array + arr[1];
        a.textContent = " > " + arr[0];

        arr[2].appendChild(a);
    }
    
    // json_file => 检索的目标json文件
    // targetItems => json文件中要匹配的词条

    // objectItems => 匹配词条内容的对象
    // others => 目标词条位于的分支里的其他词条，此变量为数组

    // func => 若匹配成功，将会执行的函数方法

    function jsonRecursiveSearch(json_file, targetItemsName, objectItem, func, ...others) {
            
        json_file.forEach(Items => {
            
            for (let [key, value] of Object.entries(Items)) {
                    
                if (Array.isArray(value)) {
                    
                    jsonRecursiveSearch(value, targetItemsName, objectItem, func, ...others);
                } else {
    
                    if (key === targetItemsName && value === objectItem) {
    
                        others.forEach(element => {

                            for (let [nkey, nvalue] of Object.entries(Items)) {

                                if (element[1] === nkey) {
                                    
                                    element[0] = nvalue;
                                }
                            }
                        });

                        let args = [];

                        others.forEach(element => {
                            
                            if(Array.isArray(element)) {

                                args.push(element[0]);
                            } else {

                                args.push(element);
                            }

                        });

                        func(args);
                    }
                }
            }
        });
    }    

    
    function jsonDeeplySearch(json_file, targetItemsName, objectItems, func, ...others) {

        objectItems.forEach(objectItem => {
            
            jsonRecursiveSearch(json_file, targetItemsName, objectItem, func, ...others);
        });

    }

    // 获取json文件
    fetch(file_path)
    .then(response => response.json())
    .then(data => {

        let title, href;

        let loc = [];

        for (let i = loc_array.length - 1; i >= 0 && loc_array[i] !== "docs"; i--) {

            loc.push(loc_array[i]);

            loc_array.pop();

        }

        loc_array = loc_array.join('/');

        console.log(loc_array);

        loc.reverse();

        loc.pop();

        console.log(loc);

        jsonDeeplySearch(data, "path", loc, addNewA, [title, "title"], [href, "href"], nav_list);

    })
});