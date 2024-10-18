document.addEventListener('DOMContentLoaded', function() {
    
    // 获取所有触发按钮
    const triggerButtons = document.querySelectorAll('.content_list_folder');
    // 为每个按钮添加点击事件监听器
    triggerButtons.forEach(button => {
        button.addEventListener('click',function(event) {
            const content = document.getElementById(event.target.getAttribute('data-target'));
            content.classList.add('open');
        });
    });
});