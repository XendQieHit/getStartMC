import { loading_animation } from "./loading_animation.mjs";
import { relocateRoot } from "./relocate_root.mjs";

document.addEventListener('DOMContentLoaded', () => {

    // 加载动画
    const all_list = document.querySelectorAll('.content_list');
    all_list.forEach(list => {
        loading_animation(list);
    });

    // 主体部分
    const json_path = relocateRoot('json/index_list.json');

    fetch(json_path)
    .then(response => response.json())
    .then(data => {

        data.forEach(content => {
            
            const list = document.querySelector(`#${content.list}`);
            
            list.innerHTML = '';

            content.cards.forEach(Item => {
                
                const a = document.createElement('a');
                const div = document.createElement('div');
                const div_img = document.createElement('img');
                const div_h2 = document.createElement('h2');

                a.href = Item.href;
                a.target = "_blank";
                div.classList = 'content_list_card';
                div_h2.textContent = Item.text;
                div_img.src = Item.icon;

                if(Item.title) a.title = Item.title;
                
                div.appendChild(div_img);
                div.appendChild(div_h2);
                a.appendChild(div);
                list.appendChild(a);

            });

        });

    });

});