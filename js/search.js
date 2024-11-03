import { relocateRoot } from "./relocate_root.mjs";
import { jsonDeeplySearch } from "./json_recursive_search.mjs";

let json_tfn;

document.addEventListener('DOMContentLoaded', function() {

    fetch(relocateRoot('json/translate_folder_name.json'))
    .then(response => response.json())
    .then(json_file => {

        json_tfn = json_file;

    })
    .catch(() => {console.error("文档内容获取失败")});

});

function search(SearchContent) {

    const search_result = document.querySelector('.search_result');

    search_result.innerHTML = '';

    fetch(relocateRoot('json/search_key_words.json'))
    .then(response => response.json())
    .then(json_qsl => {

        // 代码主要逻辑部分
        function mainSearch(SearchContent) {

            if(SearchContent === ''){return 0;}

            for (const Item of json_qsl) {

                let isPaired = false;
                let releavance = 0; //关联度设置，目前还没弄上

                for (const key_word of Item.key_words) {

                    releavance++;

                    isPaired = key_word.includes(SearchContent) ? true : false;
        
                    if (isPaired) {
    
                        console.log('Compaired!')
    
                        // 在这里添加展示搜索元素 
                        const a = document.createElement('a');
                        const div = document.createElement('div');
                        const hr = document.createElement('hr');
                        const h3 = document.createElement('h3');
                        const p = document.createElement('p');
                        
                        function addh3Text(title) {h3.textContent = title;return title}
                        function addpText(text) {p.textContent += '>' + text}
    
                        a.href = Item.href;
                        
                        // 添加h3内容
                        let title;
                        jsonDeeplySearch(json_tfn, 'href', Item.href, addh3Text, [title, 'title']);
                        // 添加p内容
                        jsonDeeplySearch(json_tfn, 'href', Item.href, addpText, [title, 'title']);
                    
                        div.appendChild(hr);
                        div.appendChild(h3);
                        div.appendChild(p);
                        a.appendChild(div);
                        search_result.appendChild(a);

                        break;
                    }
                }
            }


            // 筛选去除重复的词条
            const result_list = document.querySelector('.search_result');
            const pre_result_list = Array.from(result_list.children);
            result_list.innerHTML = '';
            
            console.log(pre_result_list);
            
            for (let i = 0; i < pre_result_list.length; i++) {
                for(let j = i+1; j < pre_result_list.length; j++) {

                    if (pre_result_list[i].href === pre_result_list[j].href) {
                        
                        pre_result_list.splice(j,1);
                    }
                }
                result_list.appendChild(pre_result_list[i]);
            }
        }
        // 代码主要逻辑部分结束 

        
        // 判断搜索内容是否有分组，有则分开逐一搜索

        SearchContent = '' + SearchContent.match(/.*(?<!\s)/);

        SearchContent = SearchContent.split(" ");

        console.log(SearchContent);
        
        SearchContent.forEach(SearchContent => mainSearch(SearchContent));

        // 筛选去除重复结果
    })

    
}

// 监听搜索部分
const input = document.querySelector('#search_input');

    input.addEventListener("input", () => {

    const SearchContent = input.value;
    search(SearchContent);

});