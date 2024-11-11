/* 
    获取json文件绝对路径
*/

// 获取运行时的绝对路径根目录
export const relocateRoot = (filePath) => {
    let path_array = document.documentURI;
    path_array = path_array.split('/');
    for (let i = path_array.length - 1; path_array[i] !== 'docs' && i >= 0; i--) {
        path_array.pop();
    }
    path_array.pop();
    
    path_array = path_array.join('/');
    
    if (filePath.match(/^\//)) {

        filePath = filePath.match(/(?<=\/).*/);
    }

    path_array += '/' + filePath;
    
    return path_array;
}