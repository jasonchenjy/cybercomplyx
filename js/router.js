class Router {
    constructor(pages) {
        this.pages = pages;
        this.currentPage = null;
        
        // 初始化路由
        window.addEventListener('popstate', this.handleRoute.bind(this));
        document.addEventListener('DOMContentLoaded', () => {
            // 处理导航点击
            document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = e.target.dataset.page;
                    const path = e.target.getAttribute('href');
                    this.navigate(path, page);
                });
            });
            
            // 处理初始路由
            this.handleRoute();
        });
    }

    async handleRoute() {
        const path = window.location.pathname;
        const page = this.getPageFromPath(path);
        
        if (this.pages.includes(page)) {
            await this.loadPage(page);
        } else {
            // 404 处理
            this.loadPage('home');
        }
    }

    getPageFromPath(path) {
        const cleanPath = path.replace(/^\//, '');
        return cleanPath || 'home';
    }

    async loadPage(page) {
        if (this.currentPage === page) return;
        
        // 添加页面切换动画
        const mainContent = document.querySelector('main');
        mainContent.style.opacity = '0';
        
        try {
            const response = await fetch(`/pages/${page}.html`);
            const content = await response.text();
            mainContent.innerHTML = content;
            
            // 更新当前页面和激活状态
            this.currentPage = page;
            this.updateActiveLink(page);
            
            // 淡入动画
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 100);
            
        } catch (error) {
            console.error('页面加载失败:', error);
        }
    }

    navigate(path, page) {
        window.history.pushState({}, '', path);
        this.loadPage(page);
    }

    updateActiveLink(page) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
    }
}