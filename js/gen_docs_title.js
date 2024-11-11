function gen_docs_title() {

    const title = document.querySelector('title');

    const h1 = document.querySelector('.content_md').querySelector('h1');

    if (h1 !== null) {
        title.textContent = h1.textContent + " - GetStartMC";
    }
}

// content_md变化时触发
const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        gen_docs_title();
    }
});

// 配置观察选项
const config = { 
    childList: true, // 观察子节点的变化（添加、删除）
    subtree: true,   // 观察所有后代节点的变化
    attributes: false // 不观察属性变化
};

const content_md = document.querySelector('.content_md');
// 开始观察目标节点
observer.observe(content_md, config);