/* 此文件是用于生成搜索库关键词，运行于node.js */

const fs = require('node:fs/promises');
const path = require('path');

let JSONFile = [];

// 文件读取
async function readHTMLFile(file_path) {
    try {
        const readHTML = await fs.readFile(file_path, 'utf-8');
        console.log(`Successfully got file ${file_path}!`);

        // 开始处理html文件
        function regex(String_object, tagName) {
            const regex1 = new RegExp(`<${tagName}>(.*?)</${tagName}>`, 'g');
            const matches = [];
            let match;

            while ((match = regex1.exec(String_object)) !== null) {
                matches.push(match[1]); // 只提取捕获组中的内容
            }
            return matches;
        }

        // 提取关键字
        const h1 = regex(readHTML, "h1");
        const h2 = regex(readHTML, "h2");
        const h3 = regex(readHTML, "h3");

        // 存入关键字
        let keywords = [];
        function arr_push(arr) {
            arr.forEach(element => {
                keywords.push(element);
            });
        }
        arr_push(h1);
        arr_push(h2);
        arr_push(h3);

        // 处理file_path为可用的href
        href = file_path.split('\\');
        href.splice(1, 0, '?Path=docs');
        href.pop();
        href = href.join('/');
        href += '/';

        // 组合成一个对象
        const JSON = {
            href: href,
            key_words: keywords
        };

        console.log(`Keywords extracted from ${file_path}:`, keywords);
        return JSON;

    } catch (error) {
        console.error(`Error reading file ${file_path}:`, error);
        return null;
    }
}

// 遍历递归查找文件
async function readDir(dirPath) {
    try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });

        for (const item of items) {
            const fullPath = path.join(dirPath, item.name);

            if (item.isDirectory()) {
                await readDir(fullPath);
            } else if (item.isFile() && path.extname(item.name) === '.html') {
                const keywords = await readHTMLFile(fullPath);
                if (keywords) {
                    JSONFile.push(keywords);
                }
            }
        }

    } catch (error) {
        console.error('遍历递归查找文件失败', error);
    }
}

// 文件写入
async function main() {
    await readDir('./docs');

    const jsonContent = JSON.stringify(JSONFile, null, 2);
    try {
        await fs.writeFile('./json/search_key_words.json', jsonContent, 'utf-8');
        console.log('文件写入成功!');
    } catch (error) {
        console.error('文件写入失败', error);
    }
}

main();