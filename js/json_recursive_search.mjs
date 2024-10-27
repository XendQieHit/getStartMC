
// json_file => 检索的目标json文件
// targetItemsName => json文件中要匹配的词条名

// objectItem => 匹配词条内容的对象
// others => 目标词条位于的分支里的其他词条，此变量为数组
// 其中，others的变量要先声明

// func => 若匹配成功，将会执行的函数方法

function jsonRecursiveSearch(json_file, targetItemsName, objectItem, func, ...others) {
            
    json_file.forEach(Items => {
        
        for (let [key, value] of Object.entries(Items)) {
                
            if (Array.isArray(value)) {
                
                jsonRecursiveSearch(value, targetItemsName, objectItem, func, ...others);
            } else {

                if (key === targetItemsName && value === objectItem) {

                    others.forEach(element => {

                        for (let [nkey, nvalue] of Object.entries(Items)) {
                            
                            if (element[1] === nkey) {

                                element[0] = nvalue;
                            }
                        }
                    });

                    let args = [];

                    others.forEach(element => {
                        
                        if(Array.isArray(element)) {

                            args.push(element[0]);
                        } else {

                            args.push(element);
                        }

                    });

                    func(args);
                }
            }
        }
    });
}    


function jsonDeeplySearch(json_file, targetItemsName, objectItems, func, ...others) {

    objectItems.forEach(objectItem => {
        
        jsonRecursiveSearch(json_file, targetItemsName, objectItem, func, ...others);
    });

}

export { jsonDeeplySearch };