/* 
    将md文章段落分块打包
*/

document.addEventListener('DOMContentLoaded', function() {

    const md = document.querySelector('.content_md').children;
    const md_col = Array.from(md);
    const collection = document.querySelector('.content_md');

    for (let i = 1; i < md_col.length; i++) {
        
        // h1查询
        if (md_col[i].matches('h1')) {
            
            const section_h1 = document.createElement('section');
            section_h1.id = md_col[i].textContent;

            section_h1.appendChild(md_col[i]);

            
            // 进入编组，在遇到h1时退出循环
            for (let j = i + 1; j < md_col.length && !md_col[j].matches('h1'); j++) {
                
                // h2查询
                if (md_col[j].matches('h2')) {
                    
                    const section_h2 = document.createElement('section');
                    section_h2.id = md_col[j].textContent;
                    
                    section_h2.appendChild(md_col[j]);
                    
                    // 进入编组，在遇到h2时退出循环
                    for (let k = j + 1; k < md_col.length && !md_col[k].matches('h1') && !md_col[k].matches('h2'); k++) {
                        
                        section_h2.appendChild(md_col[k]);
                        j = k;
                    }
                    section_h1.appendChild(section_h2);
                } else section_h1.appendChild(md_col[j]);
                i = j;
            }
            
            collection.appendChild(section_h1);
        }
    }
});