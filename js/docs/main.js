import { get_navigation } from "./get_navigation.mjs";
import { load_content_md } from "./load_content_md.mjs";
import { apart_md_content } from "./apart_md_content.mjs";
import { gen_docs_title } from "./gen_docs_title.mjs";
import { zoomify_imgs } from "./zoomify_img.mjs";
import { get_pg_list } from "./get_pg_list.mjs";
import { get_ql_menu } from "./get_ql_menu.mjs";

document.addEventListener('DOMContentLoaded', async function() {
    get_navigation(); // 加载导航栏
    get_ql_menu(); // 加载总目录
    await load_content_md(); // 加载文档内容
    gen_docs_title(); // 更新网页标题
    get_pg_list(); // 加载段落标题栏
    zoomify_imgs(); // 加载图片缩放功能
    apart_md_content(); // 分段文档内容
});