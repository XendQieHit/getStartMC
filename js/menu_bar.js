document.addEventListener('DOMContentLoaded', function() {
    
    /* 监听整个视窗的点击事件 */
    const triggerButtons = document.querySelector('.toppic_bar_menu_button');
    const menu_bar = document.getElementById('menu_bar');

    /* 检测屏幕点击事件 */
    window.addEventListener('click', function(event) {
        
        /* 检测点击按钮时开关状态 */
        if (triggerButtons.contains(event.target) && !menu_bar.classList.contains('open')) {
            menu_bar.classList.add('open');
        } else {
            menu_bar.classList.remove('open');
        }
    });
});
