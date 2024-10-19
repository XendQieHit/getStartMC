document.addEventListener('DOMContentLoaded', function() {
    
    /* 
        获取json文件绝对路径
    */

    // 获取运行时的绝对路径根目录
    const running_path = document.documentURI;
    let path_array = running_path.split('/');
    for (let i = path_array.length - 1; path_array[i] !== 'docs' && i >= 0; i--) {
        path_array.pop();
    }
    path_array.pop();
    
    let path = '';

    for (let i = 0; i <= path_array.length - 1; i++) {
        path += path_array[i] + '/'
    }

    // 在这里输入你要调用的json文件的路径
    path += 'json/menu_list.json';



    /* 监听整个视窗的点击事件 */
    const triggerButtons = document.querySelector('.toppic_bar_menu_button');
    let menu_bar = document.getElementById('menu_bar');

    /* 抓取列表数据 */
    fetch(path)
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
