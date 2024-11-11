function loading_animation(parentElement) {
    const loading = document.createElement('div');
    loading.classList = 'loading';
    parentElement.appendChild(loading);
}

export { loading_animation };

/*  ↓ css模板 ↓ 获取自https://css.bqrdh.com/loader

    .loading {
    margin: auto;
    width: 36px;
    height: 36px;
    border: 5px solid #6cc;
    border-bottom-color: #cff;
    border-radius: 50%;
    -webkit-animation: rotation 1s linear infinite;
    animation: rotation 1s linear infinite;
}
 */