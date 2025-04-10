document.addEventListener('DOMContentLoaded', function() {
    // 简单的路由器类定义
    class Router {
        constructor(routes) {
            this.routes = routes;
            this.initRouter();
        }
        
        initRouter() {
            // 获取当前页面路径
            const path = window.location.pathname;
            const currentPage = path.split('/').pop().split('.')[0] || 'index';
            
            // 高亮当前页面的导航链接
            document.querySelectorAll('.nav-links a').forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop().split('.')[0];
                if (linkPage === currentPage || (currentPage === 'index' && linkPage === 'home')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
    
    // 初始化路由
    const router = new Router(['home', 'services', 'process', 'assessment', 'about', 'contact']);
    
    // 表单提交处理
    const form = document.getElementById('assessment-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 添加提交反馈
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="loading-spinner"></span> 提交中...';

            // 模拟提交过程
            setTimeout(() => {
                submitButton.innerHTML = '<span class="success-icon">✓</span> 提交成功！';
                
                // 显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '感谢您的提交！我们的团队会在24小时内与您联系。';
                form.appendChild(successMessage);

                // 重置表单状态
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '提交评估';
                    successMessage.remove();
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }

    // 语言切换
    const langSwitch = document.querySelector('.language-switch');
    if (langSwitch) {
        langSwitch.addEventListener('click', function(e) {
            console.log('语言切换按钮被点击');
            // e.preventDefault();
            // 这里添加语言切换逻辑
            this.textContent = this.textContent === 'EN' ? 'CN' : 'EN';
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 服务页面标签切换
    document.addEventListener('DOMContentLoaded', function() {
        const tabLinks = document.querySelectorAll('.tab-link');
        const serviceSections = document.querySelectorAll('.service-section');
    
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 移除所有活动状态
                tabLinks.forEach(tab => tab.classList.remove('active'));
                serviceSections.forEach(section => section.classList.remove('active'));
                
                // 添加新的活动状态
                link.classList.add('active');
                const targetId = link.getAttribute('href').substring(1);
                document.getElementById(targetId).classList.add('active');
            });
        });
    });
    
    // 评估页面导航切换
    // 服务导航切换
    document.addEventListener('DOMContentLoaded', function() {
        const serviceLinks = document.querySelectorAll('.service-nav-links a');
        const serviceSections = document.querySelectorAll('.service-section');
    
        serviceLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 移除所有活动状态
                serviceLinks.forEach(l => l.classList.remove('active'));
                serviceSections.forEach(s => s.classList.remove('active'));
                
                // 添加新的活动状态
                link.classList.add('active');
                const targetId = link.getAttribute('href').substring(1);
                document.getElementById(targetId).classList.add('active');
            });
        });
    });

    // 移动端菜单处理
    const initMobileMenu = function() {
        console.log('初始化移动菜单');
        const menuToggle = document.getElementById('menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const navLinks = document.getElementById('mobile-nav-links');
        const menuIcon = document.getElementById('menu-icon');
        
        console.log('菜单元素:', { menuToggle, mobileNav, navLinks, menuIcon });
        
        if (!menuToggle || !mobileNav || !navLinks || !menuIcon) {
            console.error('未找到移动菜单元素:', { menuToggle, mobileNav, navLinks, menuIcon });
            return;
        }
        
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('菜单按钮被点击');
            console.log('点击前状态:', { 
                mobileNavActive: mobileNav.classList.contains('active'),
                navLinksShow: navLinks.classList.contains('show'),
                menuIconBars: menuIcon.classList.contains('fa-bars'),
                menuIconTimes: menuIcon.classList.contains('fa-times')
            });
            
            mobileNav.classList.toggle('active');
            navLinks.classList.toggle('show');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
            
            console.log('点击后状态:', { 
                mobileNavActive: mobileNav.classList.contains('active'),
                navLinksShow: navLinks.classList.contains('show'),
                menuIconBars: menuIcon.classList.contains('fa-bars'),
                menuIconTimes: menuIcon.classList.contains('fa-times')
            });
        });
    
        // 点击导航链接时关闭菜单
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                navLinks.classList.remove('show');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    };

    // 在 DOMContentLoaded 事件中调用初始化函数
    initMobileMenu();
});