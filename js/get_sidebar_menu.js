import { relocateRoot } from "./relocate_root.mjs" // 重定向根目录

document.addEventListener('DOMContentLoaded', function() {
    const path = relocateRoot('json/translate_sidebar_menu.json');

    let current_path = document.documentURI || document.URL;
    current_path = current_path.split('/');
    current_path.pop();

    // 获取当前目录名，用于高光
    const current_loc = current_path.pop();

    fetch(path)
    .then(response => response.json())
    .then(json => {

        const sidebar_ql_content = document.querySelector('.sidebar_ql_content');
        
        // 开始读取目录json文件并进行处理
        for (let i of json.root) {
            
            // 创建头表
            const section = document.createElement('section');
            section.classList.add('ql_section');

            const section_head = document.createElement('a');
            const section_head_text = document.createElement('h5');

            section_head.href = relocateRoot('') + i.href;
            section_head_text.textContent = i.title;

            section_head.appendChild(section_head_text)

            
            
            section.appendChild(section_head);
            
            // 遍历生成条目
            for (let j of i.branches) {
                
                const details = document.createElement('details');
                details.classList.add('ql_details');

                const summary = document.createElement('summary');
                const section_ol = document.createElement('ol');
                
                summary.textContent = j.theme;
                
                // 遍历生成子条目
                for (let k of j.branches) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
    
                    a.textContent = k.title;
                    a.href = relocateRoot('') + k.href;
                    
                    if(current_loc === k.path) a.classList.add('highlight');

                    li.appendChild(a);
                    section_ol.appendChild(li);
                }

                details.appendChild(summary);
                details.appendChild(section_ol);
                section.appendChild(details);
            }    

            if(current_loc === i.path) section_head_text.classList.add('highlight');

            section.appendChild(document.createElement('br'));
            sidebar_ql_content.appendChild(section);
        }
    })
    .catch();
})