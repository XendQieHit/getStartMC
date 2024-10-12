document.addEventListener('DOMContentLoaded', function() {
    
    /* 监听整个视窗的点击事件 */
    const triggerButtons = document.querySelector('.toppic_bar_menu_button');
    const menu_bar = document.getElementById('menu_bar');

    /* 抓取列表数据 */
    async function getMenu() {
        fetch("json/menu_list.json")
        .then(response => response.json()) // 将响应转换为 JSON
        .then(data => {
            console.log(data);
            // 在这里处理数据
        })
        .catch(error => {
            console.error("Error fetching the JSON file:", error);
        });
    }
    
    /* 检测屏幕点击事件 */
    window.addEventListener('click', function(event) {

        /* 检测点击按钮时开关状态 */
        if (triggerButtons.contains(event.target) && !menu_bar.classList.contains('open')) {
            getMenu();
            menu_bar.classList.add('open');
        } else {
            menu_bar.classList.remove('open');
        }
    });
});
