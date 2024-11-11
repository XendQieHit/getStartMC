// Param是字符串str
function getQueryParams(Param) {

    const urlParams = new URLSearchParams(window.location.search);
    let param = urlParams.get(Param);
    
    // 去除含有.html后缀词条
    if (param.match(/[.html]$/)) {
        param = param.match(/.*\//);
        param = param.toString();
    }
    // 最后面没有 / 的话就补上
    if (param.match(/[^\/]$/)) {
        param += '\/';
    }
    return param;
}
export { getQueryParams };