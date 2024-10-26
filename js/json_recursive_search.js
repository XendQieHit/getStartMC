/*
    这个只是一个研究失败的 通用json文件指定条目查询 的代码
    不要导入运用这个代码！
*/

let runningCount = 0;

function jsonRecursiveSearch(json_file, targetItemsName, objectItems, func, ...others) {

    json_file.forEach(Items => {

        for (let [key, value] of Object.entries(Items)) {
                
            if (Array.isArray(value)) {
                
                jsonRecursiveSearch(value, targetItemsName, objectItems, func, ...others);
            } else {

                if (key === targetItemsName) {

                    others.forEach(element => {

                        for (let [nkey, nvalue] of Object.entries(Items)) {

                            if (element[1] === nkey) {
                                element[0] === nvalue;
                            }
                        }
                    });

                    func(others);

                }
            }
        }
    });
}
