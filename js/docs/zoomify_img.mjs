function main() {

/* 方法预备库 */

    // 拖拽
    function drag(display_img) {

        let offsetX, offsetY; // 桌面端检测使用offset
        let old_clientX, old_clientY; // 移动端检测使用client，啊移动端为什么没有offset啊啊

        if (window.innerWidth > 769) {

            // 桌面端的鼠标拖拽
            const onMove = (e) => {
                e.preventDefault();
                display_img.style.left = (e.clientX - offsetX) + 'px';
                display_img.style.top = (e.clientY - offsetY) + 'px';
            };
            
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
    
            display_img.addEventListener('mousedown', (e) => {
                e.preventDefault();
                offsetX = e.offsetX;
                offsetY = e.offsetY;
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onMouseUp);
            });

        } else {

            // 移动端的触摸拖拽
            // 触摸移动事件
            const onTouchMove = (e) => {
                const touch = e.touches[0];
                const dx = touch.clientX - old_clientX;
                const dy = touch.clientY - old_clientY;

                // 使用方法获取图片位置
                const rect = display_img.getBoundingClientRect();

                display_img.style.top = (rect.top + dy) + 'px';
                display_img.style.left = (rect.left + dx) + 'px';

                old_clientX = touch.clientX;
                old_clientY = touch.clientY;
            };
            
            // 触摸结束事件
            const onTouchEnd = () => {
                document.removeEventListener('touch', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            };
    
            // 添加触摸监听
            display_img.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                old_clientX = touch.clientX;
                old_clientY = touch.clientY;
                document.addEventListener('touchmove', onTouchMove);
                document.addEventListener('touchend', onTouchEnd);
            });
        }
    }

    // 缩放
    function zoom(display_img) {
        let di_height, di_width;
        let wheelTimeout = null;

        
        display_img.onload = () => {
            di_height = display_img.clientHeight;
            di_width = display_img.clientWidth;         
        };

        if (display_img.complete) display_img.onload();

        function onWheel(e) {
            // 阻止默认滚动行为
            e.preventDefault();

            // 计算新的高度和宽度
            const scale = 1 + (e.deltaY > 0 ? -0.1 : 0.1);

            // 更新图片的高度和宽度
            di_height *= scale;
            di_width *= scale;

            // 设置图片的新尺寸
            display_img.style.height = `${di_height}px`;
            display_img.style.width = `${di_width}px`;
            display_img.style.maxHeight = `${di_height}px`;
            display_img.style.maxWidth = `${di_width}px`;

            // 调整图片位置
            // 获取目前的坐标
            const rect = display_img.getBoundingClientRect();

            // 将图片位置调整到鼠标焦点位置
            display_img.style.top = `${rect.top - (scale - 1) * e.offsetY}px`;
            display_img.style.left = `${rect.left - (scale - 1) * e.offsetX}px`;
        }
        
        function throttledOnWheel(e) {
            e.preventDefault();
            if (!wheelTimeout) {
                wheelTimeout = requestAnimationFrame(() => {
                    display_img.onload();
                    onWheel(e);
                    wheelTimeout = null;
                });
            }
        }

        // 监听滚轮事件
        display_img.addEventListener('wheel', throttledOnWheel);
    }

/* 开始 文档图片读取和处理 */
    
    // 获取文档中所有图片
    const imgs = document.querySelector('.content_md').querySelectorAll('img');

    // 获取content_img_zoomify及其包含的元素
    const content_img_zoomify = document.querySelector('.content_img_zoomify');
    const img_bg = content_img_zoomify.querySelector('.img_bg');
    const fake_close_button = content_img_zoomify.querySelector('.fake_close_button');
    const img_content = content_img_zoomify.querySelector('.img_content');

    // 将所有文档图片各自包在一个div里，备用
    function zoomify_img(img) {
        const div = document.createElement('div');
        div.classList = 'img_div';
        img.before(div);
        div.appendChild(img);
    }

    imgs.forEach(img => {
        zoomify_img(img);
    });


/* 监听屏幕点击事件 */

    window.addEventListener('click', (event) => {
        
        const display_img = document.querySelector('.display_img');

    /* 检测是否有展示图片请求 */

        for (let img of imgs) {
            
            if (img.contains(event.target)) {
                
                // 添加展示图片
                img_content.innerHTML = '';
                
                const display_img = document.createElement('img');
                display_img.src = img.src;
                display_img.classList = 'display_img';
                
                console.log('-----------', display_img.style.top, display_img.style.left);

                img_content.appendChild(display_img);

                console.log(display_img.style.top, display_img.style.left);
                
                // 初始化图片
                display_img.onload = () => {

                    display_img.style.height = `${display_img.clientHeight}px`;
                    display_img.style.width = `${display_img.clientWidth}px`;


                    let di_top = window.innerHeight / 2 - display_img.clientHeight / 2;
                    let di_left = window.innerWidth / 2 - display_img.clientWidth / 2;

                    console.log(display_img.clientHeight, display_img.clientWidth);

                    display_img.style.top = `${di_top}px`;
                    display_img.style.left = `${di_left}px`;
                }

                if(display_img.complete) display_img.onload();

                console.log(display_img.style.top, display_img.style.left);

                // 展示图片窗口
                content_img_zoomify.classList.remove('hidden');
                
                // 添加监听事件
                
                // 缩放
                zoom(display_img);
                
                // 拖拽
                drag(display_img);
                break;
            }
            // 检测是否正在展示图片
        }


    /* 图片展示监听事件区 */

        if (display_img !== null) {

            // 检测鼠标是否失去焦点
            if (img_bg.contains(event.target) | fake_close_button.contains(event.target) && !content_img_zoomify.classList.contains('hidden')) {

                img_content.innerHTML = '';
                content_img_zoomify.classList.add('hidden');
                
                /* 移除事件监听 */
                
                // 缩放
                display_img.removeEventListener('wheel', (e) => {
                    onWheel(e);
                });
                
                // 拖拽
                // 桌面端
                display_img.removeEventListener('mousedown', (e) => {
                    e.preventDefault();
                    offsetX = e.offsetX;
                    offsetY = e.offsetY;
                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onMouseUp);
                });

                // 移动端
                display_img.removeEventListener('touchstart', (e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    old_clientX = touch.clientX;
                    old_clientY = touch.clientY;
                    document.addEventListener('touchmove', onTouchMove);
                    document.addEventListener('touchend', onTouchEnd);
                });
            }
        }
    })
}
export { main as zoomify_imgs };