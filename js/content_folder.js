document.addEventListener('DOMContentLoaded', function() {
    
    // 获取所有触发按钮
    const triggerButtons = document.querySelectorAll('button');
    // 为每个按钮添加点击事件监听器
    triggerButtons.forEach(button => {
        button.addEventListener('click',function(event) {
            const content = document.getElementById(event.target.getAttribute('data-target'));
            if (content.classList.contains('open')) {
                content.classList.remove('open');
            } else {
                content.classList.add('open');
            }
        });
    });
});
function search(key){
    const list = ["游戏下载","MOD模组、整合包安装","多人联机方法","正版购买与登录","存档、资源包导入","光影安装","服务器的简单部署","皮肤、披风、玩家名更改","转移和修改玩家数据","手动部署Java环境及其注意事项","Java版与基岩版跨平台联机","迁移中国版存档的注意事项"]
    let temp = '';
    for (x in list) {
        if (list[x].includes(key)){
            temp += '<div><a href="">'+list[x]+'</a></div>';
        };
    };
    if (key!=undefined){
        temp += '<div><a href="">正在建设中...</a></div>';
        document.getElementById('search_result').innerHTML = temp;
    } else {
        document.getElementById('search_result').innerHTML = '';
    }
}
