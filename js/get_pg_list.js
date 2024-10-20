document.addEventListener('DOMContentLoaded', function() {

    // 读取 md文档 元素
    const content_md = document.querySelector('.content_md');

    const para_content = content_md.children;

    // 选择快捷目录主体
    const para = document.querySelector('.content_pg');

    // 将md文档标题提取、拷贝，并插入最前面（不能直接用文档标题元素插入，会造成元素位置转移）
    const paraHead = document.createElement('h1');
    paraHead.textContent = para_content[0].textContent;
    para.appendChild(paraHead);
    
    // 创建快捷目录列表
    const paraList = document.createElement('div');
    paraList.classList = 'content_pg_list';
    para.appendChild(paraList);

    paraList.innerHTML = '';

    let loc_list = 1;

    // 逐个读取 md文档中的 子标题 并放入快捷目录列表
    while (loc_list < para_content.length) {
        
        if (para_content[loc_list].matches('h1')) {

            const parah1 = para_content[loc_list].textContent;
            para_content[loc_list].id = parah1;

            const h1 = document.createElement('ol');

            const h1_a = document.createElement('a');
            h1_a.textContent = parah1;
            h1_a.href = window.location.pathname + '#' + parah1;
            
            h1.appendChild(h1_a);

            let j = loc_list + 1

            while (j < para_content.length && !para_content[j].matches('h1')) {

                if (para_content[j].matches('h2')) {

                    const parah2 = para_content[j].textContent;
                    para_content[j].id = parah2;
        
                    const h2 = document.createElement('li');
                    const h2_a = document.createElement('a');
        
                    
                    // const parah2_text = parah2.match(/[^(\d.\s)].*/);
                    
                    h2_a.textContent = parah2;

                    h2_a.href = window.location.pathname + '#' + parah2;
                    
                    h2.appendChild(h2_a);
                    
                    h1.appendChild(h2);
                }

                j++
            }
            
            paraList.appendChild(h1);
        }

        loc_list++
    }
});
