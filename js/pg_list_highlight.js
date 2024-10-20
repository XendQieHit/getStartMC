document.addEventListener('DOMContentLoaded', function() {

    const sections = document.querySelectorAll('.section');

    function highlightSection() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionBottom = sectionTop + section.offsetHeight;

            // 检查当前滚动位置是否在某个section的范围内
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                section.classList.add('highlight');
            } else {
                section.classList.remove('highlight');
            }
        });
    }

    // 监听滚动事件
    window.addEventListener('scroll', highlightSection);

    // 初始化时调用一次，以防页面加载时某个section已经在视口中
    highlightSection();
});