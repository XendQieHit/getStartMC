document.addEventListener('DOMContentLoaded', function() {

    // 读取 md文档 元素
    const paraContent = document.querySelector('.content_md');
    const parah1_All = paraContent.getElementsByTagName('h1');
    
    // 选择快捷目录主体
    const para = document.querySelector('.content_pg');

    // 将md文档标题提取、拷贝，并插入最前面（不能直接用文档标题元素插入，会造成元素位置转移）
    const paraHead = document.createElement('h1');
    paraHead.textContent = parah1_All[0].textContent;
    para.appendChild(paraHead);
    
    // 创建快捷目录列表
    const paraList = document.createElement('div');
    paraList.classList = 'content_pg_list';
    para.appendChild(paraList);

    paraList.innerHTML = '';

    // 逐个读取 md文档中的 子标题 并放入快捷目录列表
    for (let i = 1; i < parah1_All.length; i++) {

        const parah1 = parah1_All[i].textContent;
        parah1_All[i].id = parah1;
        const h1 = (i == 0) ? document.createElement('h2') : document.createElement('a');
        h1.textContent = parah1;
        h1.href = window.location.pathname + '#' + parah1;

        paraList.appendChild(h1);
    }
});
