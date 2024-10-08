document.addEventListener('DOMContentLoaded', function() {
    // 获取所有触发按钮
    const triggerButtons = document.querySelectorAll('.content_list_folder');

    // 为每个按钮添加点击事件监听器
    triggerButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const targetId = event.target.getAttribute('data-target');
            const content = document.getElementById(targetId);
            
            if (content) {
                // 显示内容
                content.classList.add('open');

                // 等待动画结束后再删除按钮
                content.addEventListener('transitionend', function handler() {
                    // 删除按钮
                    event.target.remove();

                    // 移除事件监听器，防止多次触发
                    content.removeEventListener('transitionend', handler);
                });
            }
        });
    });
});