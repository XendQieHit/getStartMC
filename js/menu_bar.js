document.addEventListener('DOMContentLoaded', function() {
    
    /* 监听整个视窗的点击事件 */
    const triggerButtons = document.querySelector('.toppic_bar_menu_button');
    const menu_bar = document.getElementById('menu_bar');
    const menu_bar_bg = document.getElementById('menu_bar_bg');

    /* 检测屏幕点击事件 */
    window.addEventListener('click', function(event) {
        
        /* 检测按钮是否点击 */
        if (triggerButtons.contains(event.target)) {
            if (menu_bar.classList.contains('open')) {
                menu_bar.classList.remove('open');
                menu_bar_bg.classList.remove('open');            
            } else {
                menu_bar.classList.add('open');
                menu_bar_bg.classList.add('open');
            }
        /* 检测菜单是否开启 */
        } else if (!menu_bar.contains(event.target) && menu_bar.classList.contains('open')) {
            menu_bar.classList.remove('open');
            menu_bar_bg.classList.remove('open');
        }
    });
});
