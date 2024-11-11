import { getQueryParams } from "./get_queryparam.mjs"; // 获得URL查询字符串
import { loading_animation } from "./loading_animation.mjs";
import { relocateRoot } from "./relocate_root.mjs";

const content_md = document.querySelector(".content_md");

const docs_path = relocateRoot(getQueryParams('Path'));

async function load_content_md() {

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
    });
}

/*  原来打算使用canvas弄加载动画，后面发现好像css更简单且性能更好[捂脸]つ﹏⊂

function loading_animation() {
    const canvas = document.createElement('canvas');
    canvas.classList = 'canvas_loading';
    const ctx = canvas.getContext('2d');

    // 设置画布大小为浏览器窗口的大小
    canvas.width = content_md.clientWidth;
    canvas.height = content_md.clientHeight;

    // 加载动画的参数
    const radius = 20; // 圆形半径
    const lineWidth = 5; // 线条宽度
    const strokeColor = '#3498db'; // 线条颜色
    let progress = 0; // 当前进度
    const speed = 0.01; // 每次更新增加的进度

    function drawCircle() {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 计算中心点
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // 旋转画布
        ctx.translate(centerX - radius - lineWidth, centerY - radius - lineWidth);
        ctx.rotate(0.01 * 2 * Math.PI);
        ctx.translate(-centerX + radius + lineWidth, -centerY + radius + lineWidth);

        // 开始路径
        ctx.beginPath();

        // 绘制圆弧
        ctx.arc(centerX - radius - lineWidth, centerY - radius - lineWidth, radius, -0.5 * Math.PI, -0.5 * Math.PI + 2 * Math.PI * 0.9, false);

        // 设置样式
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;

        // 绘制路径
        ctx.stroke();

        const linearGradient = ctx.createLinearGradient(centerX, centerY, 200, 0);
        linearGradient.addColorStop(0, 'red');
        linearGradient.addColorStop(1, 'blue');
        ctx.fillStyle = linearGradient;
        ctx.fillRect(10, 10, 200, 100);
    }

    async function updateProgress() {
        // 更新进度
        progress += speed;

        setTimeout(() => {
            // 如果进度超过1，则重置为0，形成循环效果
            if (progress > 1) {
                progress = 0;
            }

            // 绘制图形
            drawCircle();

            requestAnimationFrame(updateProgress);
        },10)

        // 使用requestAnimationFrame进行循环调用
    }

    content_md.appendChild(canvas);

    // 开始动画
    updateProgress();
} */


document.addEventListener('DOMContentLoaded', function() {
    loading_animation(content_md);
    load_content_md();
});