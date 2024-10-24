const triggerButtons = document.querySelector('.nav_list_button');
const ql_menu = document.querySelector('.content.ql');

/* 检测屏幕点击事件 */
window.addEventListener('click', function(event) {

    /* 检测点击按钮时开关状态 */
    if (triggerButtons.contains(event.target) && !ql_menu.classList.contains('open')) {
        ql_menu.classList.add('open');
    } else {
        ql_menu.classList.remove('open');
    }
});
