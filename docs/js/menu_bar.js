document.addEventListener('DOMContentLoaded', function() {
    
    

    /* 监听整个视窗的点击事件 */
    const triggerButtons = document.querySelector('.toppic_bar_menu_button');
    let menu_bar = document.getElementById('menu_bar');

    /* 抓取列表数据 */
    async function getMenu() {
        fetch("../../json/menu_list.json")
        .then(response => response.json()) // 将响应转换为 JSON
        .then(data => {
            // 在这里处理数据
            let temp = '<div class="menu_bar_content">';
            temp += '<div class="menu_bar_content_top">';
            for (y in data.menu_bar_content[0]) {
                if(y > 0) temp += '<div class="side_line"></div>';
                temp += '<div>';
                temp += '<a href=""><p>'+data.menu_bar_content[0][y].title+'</p></a>';
                temp += '<ul>'
                for (x in data.menu_bar_content[0][y].items) {
                    temp += '<li><a href='+data.menu_bar_content[0][y].items[x].href+'>'+data.menu_bar_content[0][y].items[x].text+'</a></li>';
                }
                temp += '</ul>';
                temp += '</div>';
            }
            temp += '</div>';
            temp += '<div class="menu_bar_content_bottom">';
            for (y in data.menu_bar_content[1]){
                temp += '<a href='+data.menu_bar_content[1][y].href+'><p>'+data.menu_bar_content[1][y].text+'</p></a>'
            }
            temp += '</div>';
            temp += '</div>';
            // 写入
            menu_bar.innerHTML = temp;
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
