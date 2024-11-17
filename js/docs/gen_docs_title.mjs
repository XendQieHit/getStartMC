function gen_docs_title() {
    
    const title = document.querySelector('title');
    
    const h1 = document.querySelector('.content_md').querySelector('h1');
    
    if (h1 !== null) {
        title.textContent = h1.textContent + " - GetStartMC";
    }
}
export { gen_docs_title };