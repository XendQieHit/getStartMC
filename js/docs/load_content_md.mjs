import { getQueryParams } from "../get_queryparam.mjs"; // 获得URL查询字符串
import { loading_animation } from "../loading_animation.mjs";
import { relocateRoot } from "../relocate_root.mjs";

const content_md = document.querySelector(".content_md");

const docs_path = relocateRoot(getQueryParams('Path'));

function load_content_md() {
    
    return new Promise(function(resolve, reject) {
        loading_animation(content_md);
        // 这里接受的形参link是对应md文档转换后的html文件路径
    
        fetch(docs_path)
        .then(response => {
            if (!response.ok) {
                throw new Error('炸了！');
            }
            return response.text();
        })
        .then(html => {
    
            // 建立一个缓存操作空间，把html文本放入该空间，使其文本实例化为html元素
            const buffer = document.createElement('div');
            buffer.innerHTML = html;
            
            const imgs = buffer.querySelectorAll('img');
            
            // 图片链接地址由相对路径改为绝对路径
            imgs.forEach(img => {
                const buffer = img.src.match(/[^\/]*$/);
                img.src = docs_path + "files/" + buffer;
            });
    
            content_md.innerHTML = ''; // 初始化加载先清空
    
            content_md.innerHTML = buffer.innerHTML; // 将缓存库内容应用
            resolve();
        })
        .catch(error => {
            content_md.innerHTML = '';
            const h1 = document.createElement('h1');
            const ul = document.createElement('ul');
            const p1 = document.createElement('p');
    
            const error_hint = ["请求时间超时，重新刷新网页加载试试..？", "文档不存在，核对一下地址输入是否正确..?"];
    
            h1.textContent = ">_<加载出错了";
            content_md.appendChild(h1);
            p1.textContent = "获取文档内容失败，可能的原因：";
            content_md.appendChild(p1);
    
            for (let hint of error_hint) {
                const li = document.createElement('li');
                li.textContent = hint;
                ul.appendChild(li);
            }
    
            content_md.appendChild(ul);
            reject();
        });
    });
}
export { load_content_md };